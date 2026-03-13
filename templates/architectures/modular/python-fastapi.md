# Architecture: Modular Monolith (Python + FastAPI)

## Directory Structure
```
src/
├── modules/
│   ├── order/
│   │   ├── router.py
│   │   ├── service.py
│   │   ├── repository.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── events.py
│   ├── payment/
│   │   └── ...
│   └── user/
│       └── ...
├── shared/
│   ├── database/connection.py
│   ├── events/event_bus.py
│   └── middleware/
├── config.py
└── main.py
```

## Module Boundaries
- Each module is a Python package with its own router, service, repository
- Modules communicate via events or explicit imports of public APIs
- No direct database access across module boundaries
- Shared package for cross-cutting concerns

## Conventions
- Each module registers its own FastAPI router
- Inter-module communication via event bus
- Each module owns its SQLAlchemy models
- Public API defined in module __init__.py

## File Naming
- snake_case: order_service.py
- One module = one package under modules/

## Testing
- Per-module unit tests (pytest)
- Integration tests per module
- Cross-module E2E tests
