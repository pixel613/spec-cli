# Architecture: Clean Architecture (Python + FastAPI)

## Directory Structure
```
src/
├── domain/
│   ├── entities/order.py
│   ├── value_objects/money.py
│   ├── errors.py
│   └── ports/order_repository.py   # Abstract base classes
├── application/
│   ├── use_cases/create_order.py
│   └── dtos/order_dto.py
├── infrastructure/
│   ├── repositories/order_repository.py
│   ├── database/
│   │   ├── connection.py
│   │   └── models/order_model.py    # SQLAlchemy models
│   └── config.py
├── interface/
│   ├── routers/order_router.py
│   ├── dependencies.py              # FastAPI dependency injection
│   └── middleware/
│       └── error_handler.py
└── main.py                          # FastAPI app setup
```

## Dependency Rule
- domain → depends on nothing outside, pure Python classes and ABCs
- application → depends only on domain; use cases call externals via ports (ABCs)
- infrastructure → implements domain ports
- interface → depends on application; FastAPI routers + dependencies

## Conventions
- Ports defined as Abstract Base Classes (ABC) in domain/ports/
- FastAPI dependency injection for wiring infrastructure to use cases
- Pydantic models for DTOs and request/response validation
- SQLAlchemy 2.0 style for ORM (if used)

## File Naming
- snake_case: create_order.py
- Test files: test_create_order.py
- One class per file or closely related classes grouped

## Testing
- domain: pure unit tests (pytest)
- application: mock ports (pytest-mock)
- infrastructure: integration tests (testcontainers)
- interface: HTTP tests (httpx + TestClient)
