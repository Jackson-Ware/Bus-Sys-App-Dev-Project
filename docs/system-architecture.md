┌─────────────────────────────────────────────────────────────┐
│                      USER DEVICES                            │
│              (Desktop, Mobile, Tablet)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────┐
│               FRONTEND LAYER                                 │
│            (Azure App Service)                               │
│                                                              │
│         React + TypeScript                                   │
│         • Product Catalog                                    │
│         • Shopping Cart                                      │
│         • Student Dashboard (My Books)                       │
│         • Faculty Adoption Portal                            │
│         • Role-Based Navigation                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           │ REST API (JSON)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│               BACKEND LAYER                                  │
│            (Azure App Service)                               │
│                                                              │
│         ASP.NET Core Web API (.NET 10)                        │
│         • Authentication (JWT)                               │
│         • Product API                                        │
│         • Order API                                          │
│         • Faculty Adoption API                               │
│         • Student Marketplace API                            │
│                                                              │
│         Entity Framework Core                                │
└─────┬──────────────┬──────────────┬────────────────────────┘
      │              │              │
      ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌────────────────────┐
│  Azure   │  │  Azure   │  │  External Services │
│   SQL    │  │   Blob   │  │                    │
│ Database │  │ Storage  │  │  • LMS API (Carmen)│
│          │  │          │  │  • Stripe Payment  │
│ • Users  │  │ • Product│  │  • SendGrid Email  │
│ • Orders │  │   Images │  │                    │
│ • Products│ │          │  │                    │
│ • Courses│  │          │  │                    │
└──────────┘  └──────────┘  └────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                  CI/CD & MONITORING                          │
│                                                              │
│  GitHub (Version Control) → GitHub Actions → Deploy to Azure│
│  Azure Application Insights (Monitoring & Logging)           │
└─────────────────────────────────────────────────────────────┘
