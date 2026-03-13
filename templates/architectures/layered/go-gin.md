# Architecture: Layered / Three-Tier (Go + Gin)

## Directory Structure
```
internal/
├── handler/
│   ├── order_handler.go
│   ├── auth_handler.go
│   ├── middleware/
│   └── router.go
├── service/
│   ├── order_service.go
│   └── auth_service.go
├── repository/
│   ├── order_repo.go
│   └── user_repo.go
├── model/
│   ├── order.go
│   └── user.go
└── config/
    └── env.go
```

## Layer Dependencies
- Handler → Service → Repository → Database
- Each layer only depends on the layer directly below

## Conventions
- Handlers handle HTTP concerns (Gin context)
- Services contain business logic, accept/return domain models
- Repositories handle data access
- Interfaces defined at consumer side for testability

## File Naming
- snake_case: order_service.go
- Test files: order_service_test.go

## Testing
- services: unit tests with mocked repositories
- handlers: HTTP tests (httptest)
- repositories: integration tests
