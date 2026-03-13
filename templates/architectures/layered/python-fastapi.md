# Architecture: Layered / Three-Tier (Python + FastAPI)

## Directory Structure
```
src/
├── routers/
│   ├── order_router.py
│   └── auth_router.py
├── services/
│   ├── order_service.py
│   └── auth_service.py
├── repositories/
│   ├── order_repository.py
│   └── user_repository.py
├── models/
│   ├── order.py
│   └── user.py
├── schemas/
│   ├── order_schema.py           # Pydantic models
│   └── auth_schema.py
├── config.py
└── main.py
```

## Layer Dependencies
- Routers → Services → Repositories → Database
- Each layer only depends on the layer directly below

## Conventions
- FastAPI dependency injection for wiring
- Pydantic schemas at router boundary
- Services contain business logic
- Repositories handle SQLAlchemy queries

## File Naming
- snake_case: order_service.py
- Test files: test_order_service.py

## Testing
- services: unit tests (pytest + mock)
- routers: HTTP tests (TestClient)
- repositories: integration tests
