# Architecture: Domain-Driven Design (Go + Gin)

## Directory Structure
```
internal/
├── order/                          # Order Bounded Context
│   ├── domain/
│   │   ├── aggregate/order.go      # Aggregate root
│   │   ├── entity/order_item.go
│   │   ├── valueobject/money.go
│   │   ├── event/order_created.go
│   │   ├── repository/order.go     # Interface
│   │   └── service/pricing.go      # Domain service
│   ├── application/
│   │   ├── command/create_order.go
│   │   ├── query/get_order.go
│   │   └── handler/create_order_handler.go
│   ├── infrastructure/
│   │   ├── postgres/order_repo.go
│   │   └── event/publisher.go
│   └── handler/
│       └── http/order_handler.go
├── payment/                        # Payment Bounded Context
│   └── ...
├── shared/
│   ├── domain/
│   │   └── base_aggregate.go
│   └── infrastructure/
│       └── event_bus.go
└── pkg/
```

## Dependency Rule
- Aggregate roots are the only entry points to modify domain state
- Domain events for cross-context communication
- Application layer uses CQRS pattern
- Infrastructure implements domain repository interfaces

## DDD Conventions
- Aggregates enforce invariants; modifications through aggregate methods
- Value Objects are immutable (unexported fields + constructor)
- Domain Events published after state changes
- Anti-corruption layers between bounded contexts

## File Naming
- snake_case: create_order.go
- One aggregate per package

## Testing
- domain: pure unit tests, test aggregate invariants
- application: mock repositories
- infrastructure: integration tests
- handler: HTTP tests
