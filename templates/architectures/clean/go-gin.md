# Architecture: Clean Architecture (Go + Gin)

## Directory Structure
```
internal/
├── domain/
│   ├── entity/order.go            # Entities, Value Objects
│   └── event/order_created.go     # Domain Events
├── usecase/
│   ├── create_order.go            # Use Cases (one file per use case)
│   └── interfaces.go              # Port interfaces
├── infrastructure/
│   ├── postgres/
│   │   └── order_repo.go          # Repository implementation
│   ├── redis/
│   │   └── cache.go               # Cache implementation (if any)
│   └── config/
│       └── env.go                 # Environment configuration
├── handler/
│   └── http/
│       ├── order_handler.go       # Gin handler
│       ├── middleware/
│       │   └── auth.go            # Middleware
│       └── router.go              # Route definitions
└── pkg/                           # Cross-project reusable packages
    └── logger/
```

## Dependency Rule
- domain → depends on nothing outside, pure Go structs and interfaces
- usecase → depends only on domain; calls infrastructure through interfaces
- infrastructure → implements usecase interfaces
- handler → depends on usecase; handles HTTP layer

## Go Conventions
- Interfaces defined at the consumer side (usecase/), not implementation side (infrastructure/)
- Error handling uses custom error types defined in domain/
- Struct initialization uses New functions: NewOrderUseCase(), NewOrderRepo()
- Context passed throughout: handler → usecase → repository

## File Naming
- snake_case: create_order.go
- Test files: create_order_test.go
- One type per file within same package

## Testing
- domain: pure unit tests
- usecase: mock interfaces (using mockgen or hand-written mocks)
- infrastructure: integration tests (using testcontainers or test DB)
- handler: HTTP tests (using httptest)
