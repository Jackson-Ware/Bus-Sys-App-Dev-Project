# Bus-Sys-App-Dev-Project
ACCTMIS 4630 - Bus Sys App Dev Project. OSU eCommerce Platform

## Business System Summary

The OSU Campus Store eCommerce Platform is a web-based system designed to streamline textbook purchasing for Ohio State students, faculty, and fans. The platform addresses key pain points: students struggle to find course-specific textbooks across multiple platforms, faculty lack visibility into adoption status and inventory, and all users need a unified shopping experience.

**Target Users:**
- **Students** (Primary): Need quick access to required textbooks with price comparison
- **Faculty**: Need to submit textbook adoptions and verify stock availability  
- **Fans**: Need easy access to official OSU merchandise

**Core Value Proposition:** Course-based auto-population eliminates manual textbook searching by automatically displaying required books based on enrolled courses.

---

## Feature Prioritization

### Must-Have Features (P1) - 9 Total
1. User Registration & Login
2. Product Catalog
3. Shopping Cart
4. Course-Based Auto-Population
5. Unified Price Comparison View
6. Faculty Textbook Adoption Portal
7. Adoption-to-Availability Confirmation
8. Role-Based Homepage & Navigation
9. Cloud Deployment

### Top User Stories
- **US1**: Course-Based Auto-Population - Students see required textbooks automatically
- **US2**: Unified Price Comparison - All pricing options on one page
- **US3**: Faculty Adoption Portal - Professors submit adoptions with stock visibility
- **US4**: Shopping Cart - Persistent cart across sessions
- **US5**: Role-Based Homepage - Dashboard adapts to user role

---

## Architecture Decisions

### Technology Stack
| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend** | React + TypeScript | Component reusability, industry standard, type safety |
| **Backend** | ASP.NET Core (.NET 10) | Enterprise-grade, Azure integration, strong typing |
| **Database** | Azure SQL Database | Relational queries, ACID compliance, managed service |
| **Hosting** | Azure App Service | Student credits, .NET optimization, PaaS simplicity |
| **Version Control** | GitHub + Actions | Industry standard, CI/CD automation, portfolio value |

### Key Architectural Patterns
- **3-Tier Architecture**: React (Presentation) → ASP.NET Core API (Business Logic) → Azure SQL (Data)
- **RESTful API**: Clean separation between frontend and backend
- **JWT Authentication**: Stateless, role-based access control
- **Atomic Design**: Component hierarchy for frontend (Atoms → Molecules → Organisms → Templates)

---

## Documentation

### Table of Contents
- [Systems Architecture Diagram](docs/System-Architecture-Diagram.md) - 3-layer architecture overview
- [Entity Relationship Diagram (ERD)](docs/Entity-Relationship-Diagram.md) - Database schema and relationships
- [Architecture Decision Records](docs/Architecture-Decision-Records.md) - Technology stack justifications
- [Project Kanban Board](https://github.com/Jackson-Ware/projects/1/views/1) - Feature prioritization and task tracking
- [Component Architecture](docs/Component-Architecture.md) - Frontend component hierarchy (Atomic Design)
- [AI Usage Documentation](docs/AI-Usage-Documentation.md) - Transparency on AI tool usage

---

## AI Tools Used

**Tool:** Claude (Anthropic) - Sonnet 4.5  
**Purpose:** Documentation structure, concept explanations, markdown formatting  
**Disclosure:** All AI-generated content was reviewed, validated, edited, and customized by the student. All architectural decisions and technology choices are my own. See [AI Usage Documentation](docs/AI-Usage-Documentation.md) for full details.

---

## Project Status

**Current Milestone:** Milestone 2 - Architecture Design & Frontend Foundation  
**Completion Date:** February 15, 2026  
**Course:** ACCTMIS 4630 - Business Systems Development

---

## Contact

**Student:** Jackson Ware  
**Email:** ware.450@osu.edu  
**Course:** ACCTMIS 4630  
**Semester:** Spring 2026
