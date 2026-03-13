# Architecture: Hexagonal / Ports & Adapters (NestJS)

## Directory Structure
```
src/
├── core/
│   ├── domain/
│   │   ├── entities/order.entity.ts
│   │   └── value-objects/money.vo.ts
│   └── ports/
│       ├── inbound/create-order.port.ts    # Driving ports (use case interfaces)
│       └── outbound/order.repository.port.ts # Driven ports
├── application/
│   └── services/order.service.ts           # Implements inbound ports
├── adapters/
│   ├── inbound/
│   │   ├── http/order.controller.ts        # REST adapter
│   │   └── grpc/order.grpc.ts              # gRPC adapter
│   └── outbound/
│       ├── persistence/order.repository.ts # DB adapter
│       └── messaging/event.publisher.ts    # Message queue adapter
└── app.module.ts
```

## Dependency Rule
- core (domain + ports) → depends on nothing, defines all interfaces
- application → implements inbound ports, depends on core only
- adapters → implement outbound ports or call inbound ports

## Conventions
- Inbound ports = use case interfaces (what the app can do)
- Outbound ports = infrastructure interfaces (what the app needs)
- Adapters are interchangeable (swap DB, swap transport)
- NestJS modules wire adapters to ports via DI

## File Naming
- kebab-case: create-order.port.ts
- Port: *.port.ts
- Adapter suffix indicates type: *.controller.ts, *.repository.ts

## Testing
- core: pure unit tests
- application: mock outbound ports
- adapters: integration tests per adapter
