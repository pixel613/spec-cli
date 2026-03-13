# Architecture: Clean Architecture (Go Standard Library)

## Directory Structure
```
internal/
├── domain/
│   ├── entity/order.go            # Entities, Value Objects
│   └── errors.go                  # Domain errors
├── usecase/
│   ├── create_order.go            # Use Cases
│   └── interfaces.go              # Port interfaces
├── infrastructure/
│   ├── postgres/
│   │   └── order_repo.go          # Repository implementation
│   └── config/
│       └── env.go                 # Environment configuration
├── handler/
│   └── http/
│       ├── order_handler.go       # net/http handler
│       ├── middleware/
│       │   └── auth.go            # Middleware
│       └── router.go              # http.ServeMux routes
└── pkg/
    └── logger/
```

## Dependency Rule
- domain → depends on nothing outside, pure Go structs and interfaces
- usecase → depends only on domain; calls infrastructure through interfaces
- infrastructure → implements usecase interfaces
- handler → depends on usecase; handles HTTP layer using net/http

## Go Conventions
- Use net/http ServeMux (Go 1.22+ enhanced routing) instead of external routers
- Interfaces defined at the consumer side (usecase/)
- Error handling uses custom error types defined in domain/
- Struct initialization uses New functions
- Context passed throughout: handler → usecase → repository

## File Naming
- snake_case: create_order.go
- Test files: create_order_test.go
- One type per file within same package

## Testing
- domain: pure unit tests
- usecase: mock interfaces
- infrastructure: integration tests (using testcontainers)
- handler: HTTP tests (using httptest)
