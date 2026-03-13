# Architecture: Modular Monolith (NestJS)

## Directory Structure
```
src/
├── modules/
│   ├── order/
│   │   ├── order.module.ts
│   │   ├── order.controller.ts
│   │   ├── order.service.ts
│   │   ├── order.repository.ts
│   │   ├── entities/order.entity.ts
│   │   ├── dtos/create-order.dto.ts
│   │   └── events/order-created.event.ts
│   ├── payment/
│   │   ├── payment.module.ts
│   │   └── ...
│   └── user/
│       ├── user.module.ts
│       └── ...
├── shared/
│   ├── shared.module.ts
│   ├── database/
│   ├── events/event-bus.ts
│   └── guards/
└── app.module.ts
```

## Module Boundaries
- Each module is self-contained with its own controller, service, repository, entities
- Modules communicate via events or explicit public APIs (exported services)
- No direct database access across module boundaries
- Shared module for truly cross-cutting concerns only

## Conventions
- Module exports define the public API
- Inter-module communication via EventEmitter or message bus
- Each module owns its database tables
- NestJS DI scoped per module

## File Naming
- kebab-case: order.service.ts, create-order.dto.ts
- One module = one directory under modules/

## Testing
- Per-module unit tests
- Integration tests per module
- Cross-module E2E tests
