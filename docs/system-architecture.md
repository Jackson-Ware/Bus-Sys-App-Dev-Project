# System Architecture Diagram
```mermaid
graph TB
    Users[User Devices<br/>Desktop, Mobile, Tablet]
    
    Frontend[Frontend Layer<br/>Azure App Service<br/><br/>React + TypeScript<br/>• Product Catalog<br/>• Shopping Cart<br/>• Student Dashboard<br/>• Faculty Portal]
    
    Backend[Backend Layer<br/>Azure App Service<br/><br/>ASP.NET Core Web API .NET 8<br/>• Authentication JWT<br/>• Product API<br/>• Order API<br/>• Faculty Adoption API]
    
    Database[(Database Layer<br/><br/>Azure SQL Database<br/>• Users<br/>• Orders<br/>• Products<br/>• Courses)]
    
    Users -->|HTTPS| Frontend
    Frontend -->|REST API| Backend
    Backend -->|Entity Framework Core| Database
    
    style Users fill:#e1f5ff
    style Frontend fill:#61dafb
    style Backend fill:#512bd4
    style Database fill:#0078d4
```

## Architecture Connection to User Needs

**Frontend (React):**
- Marcus needs fast, mobile-friendly browsing for textbooks
- Lisa needs an organized merch catalog
- Dr. Okafor needs a faculty adoption portal interface

**Backend (.NET API):**
- Handles all business logic (authentication, orders, adoptions)
- Connects to LMS API for Marcus's auto-populated "My Books"
- Manages faculty adoption workflow for Dr. Okafor

**Database (Azure SQL):**
- Stores all user data, products, orders, and course adoptions
- Relational structure supports complex queries (linking courses to textbooks)
- Entity Framework Core provides type-safe database access
