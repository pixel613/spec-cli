import fs from 'node:fs';
import path from 'node:path';
import { StateManager } from '../state/manager.js';
import * as display from '../utils/display.js';

export async function reviewCommand(
  name: string,
  options: { step?: number; summary?: boolean }
): Promise<void> {
  const state = new StateManager();
  state.ensureWorkflow();
  state.checkPhaseGuard('review', name);

  const feature = state.getFeature(name);
  if (!feature) {
    display.error(`Feature "${name}" not found.`);
    return;
  }

  if (options.summary) {
    display.heading(`Review Summary: ${name}`);
    for (let i = 0; i < feature.tasks.length; i++) {
      const t = feature.tasks[i];
      const reviewPath = state.reviewPath(name, i + 1);
      const hasReview = fs.existsSync(reviewPath);
      console.log(`  ${i + 1}. ${display.taskIcon(t.status)} ${t.name} ${hasReview ? '(reviewed)' : ''}`);
    }

    // Show final review status
    const finalReviewPath = path.join(state.reviewsDir(), `${name}-final.md`);
    if (fs.existsSync(finalReviewPath)) {
      console.log(`\n  Final branch review: exists`);
    }
    return;
  }

  if (options.step !== undefined) {
    const reviewPath = state.reviewPath(name, options.step);
    if (!fs.existsSync(reviewPath)) {
      display.error(`Review for task ${options.step} not found.`);
      return;
    }
    const content = fs.readFileSync(reviewPath, 'utf-8');
    display.heading(`Review: ${name} - Task ${options.step}`);
    console.log(content);
    return;
  }

  // Default: if completed, show final review first
  if (feature.phase === 'completed' || feature.phase === 'merged') {
    const finalReviewPath = path.join(state.reviewsDir(), `${name}-final.md`);
    if (fs.existsSync(finalReviewPath)) {
      display.heading(`Final Branch Review: ${name}`);
      console.log(fs.readFileSync(finalReviewPath, 'utf-8'));
      return;
    }
  }

  // Show most recent or pending review
  const pendingIdx = feature.tasks.findIndex((t) => t.status === 'review_pending');
  if (pendingIdx >= 0) {
    const reviewPath = state.reviewPath(name, pendingIdx + 1);
    if (fs.existsSync(reviewPath)) {
      display.heading(`Pending Review: Task ${pendingIdx + 1}`);
      console.log(fs.readFileSync(reviewPath, 'utf-8'));
      return;
    }
  }

  // Show last completed task's review
  for (let i = feature.tasks.length - 1; i >= 0; i--) {
    const reviewPath = state.reviewPath(name, i + 1);
    if (fs.existsSync(reviewPath)) {
      display.heading(`Latest Review: Task ${i + 1}`);
      console.log(fs.readFileSync(reviewPath, 'utf-8'));
      return;
    }
  }

  display.info('No reviews found.');
}
