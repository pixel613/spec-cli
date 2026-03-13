# Architecture: Hexagonal / Ports & Adapters (C# + ASP.NET Core)

## Project Structure
```
src/
├── Core/
│   ├── Domain/
│   │   ├── Entities/Order.cs
│   │   └── ValueObjects/Money.cs
│   └── Ports/
│       ├── Inbound/ICreateOrderUseCase.cs
│       └── Outbound/IOrderRepository.cs
├── Application/
│   └── Services/OrderService.cs      # Implements inbound ports
├── Adapters/
│   ├── Inbound/
│   │   └── WebApi/
│   │       ├── Controllers/OrderController.cs
│   │       └── Program.cs
│   └── Outbound/
│       ├── Persistence/
│       │   ├── OrderRepository.cs
│       │   └── ApplicationDbContext.cs
│       └── Messaging/EventPublisher.cs
```

## Dependency Rule
- Core → depends on nothing, pure C# interfaces and classes
- Application → implements inbound ports, depends only on Core
- Adapters → implement outbound ports or call inbound ports

## Conventions
- Inbound ports = use case interfaces
- Outbound ports = infrastructure interfaces
- DI registration wires adapters to ports in Program.cs
- EF Core in outbound persistence adapter

## File Naming
- PascalCase: OrderService.cs
- One class per file

## Testing
- Core: pure unit tests (xUnit)
- Application: mock outbound ports (NSubstitute)
- Adapters: integration tests (WebApplicationFactory)
