# Architecture: Domain-Driven Design (NestJS)

## Bounded Context Structure
Each bounded context is a NestJS module with DDD tactical patterns.

## Directory Structure
```
src/
├── order/                          # Order Bounded Context
│   ├── order.module.ts
│   ├── domain/
│   │   ├── aggregates/order.aggregate.ts
│   │   ├── entities/order-item.entity.ts
│   │   ├── value-objects/money.vo.ts
│   │   ├── events/order-created.event.ts
│   │   ├── repositories/order.repository.ts  # Interface
│   │   └── services/pricing.domain-service.ts
│   ├── application/
│   │   ├── commands/create-order.command.ts
│   │   ├── queries/get-order.query.ts
│   │   └── handlers/create-order.handler.ts
│   ├── infrastructure/
│   │   ├── repositories/order.typeorm-repository.ts
│   │   └── event-handlers/order-created.handler.ts
│   └── interface/
│       ├── controllers/order.controller.ts
│       └── dtos/create-order.dto.ts
├── payment/                        # Payment Bounded Context
│   └── ...
├── shared/
│   ├── domain/
│   │   └── base-aggregate.ts
│   └── infrastructure/
│       └── event-bus.ts
└── app.module.ts
```

## Dependency Rule
- Aggregate roots are the only entry points to modify domain state
- Domain events for cross-context communication
- Application layer uses CQRS (Commands + Queries)
- Infrastructure implements domain repository interfaces

## DDD Conventions
- Aggregates enforce invariants; entity modifications go through aggregate methods
- Value Objects are immutable
- Domain Events published after state changes
- Anti-corruption layers between bounded contexts
- Ubiquitous language reflected in class and method names

## File Naming
- kebab-case: create-order.command.ts
- Aggregate: *.aggregate.ts
- Value Object: *.vo.ts
- Domain Event: *.event.ts
- Domain Service: *.domain-service.ts

## Testing
- domain: pure unit tests, test aggregate invariants
- application: mock repositories, verify events
- infrastructure: integration tests
- interface: E2E tests
