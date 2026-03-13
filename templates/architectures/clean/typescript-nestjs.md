# Architecture: Clean Architecture (NestJS)

## Module-Based Structure
NestJS uses Module as its core organizational unit. Each feature gets its own Module, with Clean Architecture layers inside each Module.

## Directory Structure
```
src/
├── auth/                          # AuthModule
│   ├── auth.module.ts
│   ├── domain/
│   │   └── entities/user.entity.ts
│   ├── application/
│   │   ├── use-cases/login.use-case.ts
│   │   └── ports/auth.repository.port.ts
│   ├── infrastructure/
│   │   └── repositories/auth.repository.ts
│   └── interface/
│       ├── controllers/auth.controller.ts
│       └── dtos/login.dto.ts
├── order/                         # OrderModule
│   ├── order.module.ts
│   ├── domain/
│   ├── application/
│   ├── infrastructure/
│   └── interface/
├── shared/                        # SharedModule (cross-module shared)
│   ├── shared.module.ts
│   ├── guards/
│   ├── interceptors/
│   ├── filters/
│   └── decorators/
└── app.module.ts                  # Root module
```

## Dependency Rule
- domain → depends on nothing outside, pure TypeScript classes
- application → depends only on domain; use cases call externals via ports (interfaces)
- infrastructure → implements application ports, injected into NestJS DI container
- interface → depends on application; NestJS Controllers + DTOs

## NestJS Conventions
- Each Module registers providers, controllers, imports, exports in *.module.ts
- Use Cases inject Port interfaces, receive Infrastructure implementations via NestJS DI
- Cross-Module dependencies managed through exports + imports
- Shared Module contains global guards, interceptors, filters, decorators

## File Naming
- kebab-case: create-order.use-case.ts
- Entity: *.entity.ts
- DTO: *.dto.ts
- Controller: *.controller.ts
- Repository: *.repository.ts
- Port: *.port.ts
- Module: *.module.ts

## Testing
- domain: pure unit tests, no mocks
- application: mock ports (using NestJS Testing module)
- infrastructure: integration tests
- interface: E2E tests (using supertest)
