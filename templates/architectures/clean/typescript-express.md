# Architecture: Clean Architecture (TypeScript + Express)

## Layer-Based Structure
Express uses a layer-based approach with Clean Architecture principles separating concerns into distinct directories.

## Directory Structure
```
src/
├── domain/
│   ├── entities/order.entity.ts
│   ├── value-objects/money.vo.ts
│   └── errors/domain.error.ts
├── application/
│   ├── use-cases/create-order.use-case.ts
│   ├── ports/
│   │   ├── order.repository.port.ts
│   │   └── payment.gateway.port.ts
│   └── dtos/create-order.dto.ts
├── infrastructure/
│   ├── repositories/order.repository.ts
│   ├── services/payment.gateway.ts
│   ├── database/
│   │   ├── connection.ts
│   │   └── migrations/
│   └── config/env.ts
├── interface/
│   ├── routes/order.routes.ts
│   ├── controllers/order.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── error-handler.middleware.ts
│   └── validators/order.validator.ts
└── app.ts                         # Express app setup
```

## Dependency Rule
- domain → depends on nothing outside, pure TypeScript classes
- application → depends only on domain; use cases call externals via port interfaces
- infrastructure → implements application ports
- interface → depends on application; Express routes + controllers

## Conventions
- Dependency injection via constructor parameters or a simple DI container
- Use Cases are single-purpose classes with an `execute()` method
- Controllers handle HTTP concerns (req/res), delegate to Use Cases
- Error handling via centralized error-handler middleware

## File Naming
- kebab-case: create-order.use-case.ts
- Entity: *.entity.ts
- Value Object: *.vo.ts
- DTO: *.dto.ts
- Port: *.port.ts
- Repository: *.repository.ts

## Testing
- domain: pure unit tests, no mocks
- application: mock ports
- infrastructure: integration tests
- interface: supertest HTTP tests
