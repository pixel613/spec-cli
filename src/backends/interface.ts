export interface ExecuteOptions {
  cwd?: string;
  timeout?: number;
}

export interface ExecuteResult {
  output: string;
  sessionId: string;
  exitCode: number;
}

export interface AIBackend {
  name: string;
  isAvailable(): Promise<boolean>;
  execute(prompt: string, opts?: ExecuteOptions): Promise<ExecuteResult>;
  resume(sessionId: string, prompt: string, opts?: ExecuteOptions): Promise<ExecuteResult>;
}
