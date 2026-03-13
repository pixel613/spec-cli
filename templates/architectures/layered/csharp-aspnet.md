# Architecture: Layered / Three-Tier (C# + ASP.NET Core)

## Project Structure
```
src/
├── Controllers/
│   ├── OrderController.cs
│   └── AuthController.cs
├── Services/
│   ├── IOrderService.cs
│   ├── OrderService.cs
│   └── IAuthService.cs
├── Repositories/
│   ├── IOrderRepository.cs
│   ├── OrderRepository.cs
│   └── ApplicationDbContext.cs
├── Models/
│   ├── Order.cs
│   └── User.cs
├── DTOs/
│   ├── CreateOrderDto.cs
│   └── LoginDto.cs
├── Middleware/
│   └── ExceptionHandlerMiddleware.cs
└── Program.cs
```

## Layer Dependencies
- Controllers → Services → Repositories → Database
- Each layer only depends on the layer directly below

## Conventions
- Interface-based DI for Services and Repositories
- EF Core for data access
- DTOs at controller boundary
- Middleware for cross-cutting concerns

## File Naming
- PascalCase: OrderService.cs
- Interface prefix: IOrderService.cs

## Testing
- Services: unit tests (xUnit + NSubstitute)
- Controllers: unit tests with mocked services
- Repositories: integration tests (WebApplicationFactory)
