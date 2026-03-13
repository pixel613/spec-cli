# Architecture: Clean Architecture (C# + ASP.NET Core)

## Project Structure
```
src/
├── Domain/
│   ├── Entities/Order.cs
│   ├── ValueObjects/Money.cs
│   ├── Events/OrderCreatedEvent.cs
│   ├── Errors/DomainException.cs
│   └── Interfaces/IOrderRepository.cs
├── Application/
│   ├── UseCases/CreateOrder/
│   │   ├── CreateOrderCommand.cs
│   │   ├── CreateOrderHandler.cs
│   │   └── CreateOrderValidator.cs
│   ├── Common/
│   │   └── Behaviors/ValidationBehavior.cs
│   └── DependencyInjection.cs
├── Infrastructure/
│   ├── Persistence/
│   │   ├── ApplicationDbContext.cs
│   │   ├── Repositories/OrderRepository.cs
│   │   └── Configurations/OrderConfiguration.cs
│   ├── Services/
│   │   └── PaymentGateway.cs
│   └── DependencyInjection.cs
└── WebApi/
    ├── Controllers/OrderController.cs
    ├── Middleware/ExceptionHandlerMiddleware.cs
    ├── Filters/
    └── Program.cs
```

## Dependency Rule
- Domain → depends on nothing outside, pure C# classes
- Application → depends only on Domain; uses MediatR for CQRS
- Infrastructure → implements Domain interfaces, EF Core DbContext
- WebApi → depends on Application; ASP.NET Controllers + minimal APIs

## Conventions
- MediatR for Command/Query handling
- FluentValidation for input validation
- EF Core with Fluent API configuration (no data annotations on Domain)
- DI registration in each layer's DependencyInjection.cs

## File Naming
- PascalCase: CreateOrderCommand.cs
- One class per file
- Folder-per-feature in Application (e.g., UseCases/CreateOrder/)

## Testing
- Domain: pure unit tests (xUnit)
- Application: mock repositories (NSubstitute/Moq)
- Infrastructure: integration tests (WebApplicationFactory, TestContainers)
- WebApi: E2E tests (WebApplicationFactory)
