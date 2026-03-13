# Architecture: Domain-Driven Design (C# + ASP.NET Core)

## Project Structure
```
src/
├── Order.Domain/
│   ├── Aggregates/OrderAggregate.cs
│   ├── Entities/OrderItem.cs
│   ├── ValueObjects/Money.cs
│   ├── Events/OrderCreatedEvent.cs
│   ├── Repositories/IOrderRepository.cs
│   └── Services/PricingService.cs
├── Order.Application/
│   ├── Commands/CreateOrder/
│   │   ├── CreateOrderCommand.cs
│   │   └── CreateOrderHandler.cs
│   ├── Queries/GetOrder/
│   │   ├── GetOrderQuery.cs
│   │   └── GetOrderHandler.cs
│   └── DependencyInjection.cs
├── Order.Infrastructure/
│   ├── Persistence/
│   │   ├── OrderRepository.cs
│   │   └── OrderConfiguration.cs
│   └── EventHandlers/OrderCreatedHandler.cs
├── Order.WebApi/
│   ├── Controllers/OrderController.cs
│   └── Program.cs
└── SharedKernel/
    ├── AggregateRoot.cs
    ├── DomainEvent.cs
    └── ValueObject.cs
```

## Dependency Rule
- Domain → depends on nothing, pure C# classes
- Application → depends on Domain, uses MediatR for CQRS
- Infrastructure → implements Domain interfaces
- WebApi → depends on Application

## DDD Conventions
- Aggregate roots enforce invariants
- MediatR for Command/Query separation
- Domain Events via MediatR notifications
- Value Objects implement Equals/GetHashCode

## File Naming
- PascalCase: OrderAggregate.cs
- Folder-per-feature in Application

## Testing
- Domain: test aggregate invariants (xUnit)
- Application: mock repositories (NSubstitute)
- Infrastructure: integration tests
- WebApi: E2E tests (WebApplicationFactory)
