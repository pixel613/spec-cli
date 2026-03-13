# Architecture: Modular Monolith (Go + Gin)

## Directory Structure
```
internal/
├── modules/
│   ├── order/
│   │   ├── handler.go
│   │   ├── service.go
│   │   ├── repository.go
│   │   ├── model.go
│   │   ├── events.go
│   │   └── routes.go
│   ├── payment/
│   │   └── ...
│   └── user/
│       └── ...
├── shared/
│   ├── database/
│   ├── events/event_bus.go
│   └── middleware/
├── config/
│   └── env.go
└── cmd/
    └── main.go
```

## Module Boundaries
- Each module is a Go package with its own handler, service, repository
- Modules communicate via events or explicit function calls
- No direct database access across module boundaries
- Shared package for cross-cutting concerns

## Conventions
- Each module registers its own routes via a Setup function
- Inter-module communication via event bus
- Each module owns its database tables
- Module interfaces defined per module

## File Naming
- snake_case: order_service.go
- One module = one package under modules/

## Testing
- Per-module unit tests
- Integration tests per module
- Cross-module E2E tests
