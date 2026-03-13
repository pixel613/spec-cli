# Architecture: Hexagonal / Ports & Adapters (Python + FastAPI)

## Directory Structure
```
src/
├── core/
│   ├── domain/
│   │   ├── entities/order.py
│   │   └── errors.py
│   └── ports/
│       ├── inbound/create_order_port.py   # ABC interfaces
│       └── outbound/order_repository.py   # ABC interfaces
├── application/
│   └── services/order_service.py          # Implements inbound ports
├── adapters/
│   ├── inbound/
│   │   └── http/
│   │       ├── order_router.py
│   │       └── dependencies.py
│   └── outbound/
│       ├── persistence/order_repository.py
│       └── messaging/event_publisher.py
└── main.py
```

## Dependency Rule
- core → depends on nothing, pure Python ABCs and dataclasses
- application → implements inbound ports, depends only on core
- adapters → implement outbound ports or call inbound ports

## Conventions
- Ports defined as Abstract Base Classes in core/ports/
- FastAPI dependency injection wires adapters to ports
- Pydantic for DTOs at adapter boundary

## File Naming
- snake_case: order_service.py
- Test files: test_order_service.py

## Testing
- core: pure unit tests (pytest)
- application: mock outbound ports
- adapters: integration tests per adapter
