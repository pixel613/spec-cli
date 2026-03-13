# Architecture: Hexagonal / Ports & Adapters (Go + Gin)

## Directory Structure
```
internal/
├── core/
│   ├── domain/
│   │   ├── order.go                # Entities, Value Objects
│   │   └── errors.go               # Domain errors
│   └── ports/
│       ├── inbound.go              # Driving port interfaces
│       └── outbound.go             # Driven port interfaces
├── application/
│   └── order_service.go            # Implements inbound ports
├── adapters/
│   ├── inbound/
│   │   └── http/
│   │       ├── order_handler.go    # Gin handler
│   │       ├── middleware/
│   │       └── router.go
│   └── outbound/
│       ├── postgres/
│       │   └── order_repo.go
│       └── redis/
│           └── cache.go
└── pkg/
```

## Dependency Rule
- core → depends on nothing, pure Go types and interfaces
- application → implements inbound ports, depends only on core
- adapters → implement outbound ports or call inbound ports

## Conventions
- Ports defined as Go interfaces in core/ports/
- Adapters implement port interfaces
- Dependency injection via constructor functions
- Context passed throughout

## File Naming
- snake_case: order_service.go
- Test files: order_service_test.go

## Testing
- core: pure unit tests
- application: mock outbound ports
- adapters: integration tests per adapter
