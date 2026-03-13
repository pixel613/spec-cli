# Architecture: Layered / Three-Tier (NestJS)

## Directory Structure
```
src/
├── controllers/
│   ├── order.controller.ts
│   └── auth.controller.ts
├── services/
│   ├── order.service.ts
│   └── auth.service.ts
├── repositories/
│   ├── order.repository.ts
│   └── user.repository.ts
├── entities/
│   ├── order.entity.ts
│   └── user.entity.ts
├── dtos/
│   ├── create-order.dto.ts
│   └── login.dto.ts
├── guards/
├── interceptors/
├── pipes/
└── app.module.ts
```

## Layer Dependencies
- Controllers → Services → Repositories → Database
- Each layer only depends on the layer directly below

## Conventions
- Controllers handle HTTP, validate input via DTOs + Pipes
- Services contain business logic
- Repositories handle data access (TypeORM/Prisma/MikroORM)
- NestJS DI wires everything together

## File Naming
- kebab-case: order.service.ts, create-order.dto.ts
- Controller: *.controller.ts
- Service: *.service.ts
- Repository: *.repository.ts
- Entity: *.entity.ts

## Testing
- services: unit tests with mocked repositories
- controllers: unit tests with mocked services
- repositories: integration tests
- E2E: supertest
