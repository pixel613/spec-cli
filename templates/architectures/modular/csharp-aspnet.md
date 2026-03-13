# Architecture: Modular Monolith (C# + ASP.NET Core)

## Project Structure
```
src/
├── Modules/
│   ├── Order/
│   │   ├── OrderModule.cs
│   │   ├── Controllers/OrderController.cs
│   │   ├── Services/OrderService.cs
│   │   ├── Repositories/OrderRepository.cs
│   │   ├── Models/Order.cs
│   │   ├── DTOs/CreateOrderDto.cs
│   │   └── Events/OrderCreatedEvent.cs
│   ├── Payment/
│   │   └── ...
│   └── User/
│       └── ...
├── Shared/
│   ├── Database/ApplicationDbContext.cs
│   ├── Events/IEventBus.cs
│   └── Middleware/
└── Program.cs
```

## Module Boundaries
- Each module is self-contained with controllers, services, repositories
- Modules communicate via events or explicit interfaces
- No direct database access across module boundaries
- Shared for cross-cutting concerns only

## Conventions
- Each module has a registration extension method (AddOrderModule)
- Inter-module communication via MediatR notifications
- Each module owns its EF Core configurations
- Modules register their own DI services

## File Naming
- PascalCase: OrderService.cs
- One module = one folder under Modules/

## Testing
- Per-module unit tests (xUnit)
- Integration tests per module
- Cross-module E2E tests
