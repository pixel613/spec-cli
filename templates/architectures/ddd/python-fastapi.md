# Architecture: Domain-Driven Design (Python + FastAPI)

## Directory Structure
```
src/
├── order/                          # Order Bounded Context
│   ├── domain/
│   │   ├── aggregates/order.py     # Aggregate root
│   │   ├── entities/order_item.py
│   │   ├── value_objects/money.py
│   │   ├── events/order_created.py
│   │   ├── repositories/order_repository.py  # ABC
│   │   └── services/pricing_service.py
│   ├── application/
│   │   ├── commands/create_order.py
│   │   ├── queries/get_order.py
│   │   └── handlers/create_order_handler.py
│   ├── infrastructure/
│   │   ├── repositories/order_sqlalchemy_repo.py
│   │   └── event_handlers/order_created_handler.py
│   └── interface/
│       ├── routers/order_router.py
│       └── dtos/create_order_dto.py
├── payment/
│   └── ...
├── shared/
│   ├── domain/base_aggregate.py
│   └── infrastructure/event_bus.py
└── main.py
```

## Dependency Rule
- Aggregate roots are the only entry points to modify domain state
- Domain events for cross-context communication
- Application layer uses CQRS pattern
- Infrastructure implements domain repository ABCs

## DDD Conventions
- Aggregates enforce invariants via methods
- Value Objects use frozen dataclasses
- Domain Events as dataclass records
- Anti-corruption layers between bounded contexts

## File Naming
- snake_case: create_order.py
- Test files: test_create_order.py

## Testing
- domain: pure unit tests (pytest)
- application: mock repositories
- infrastructure: integration tests
- interface: HTTP tests (httpx)
