# Architecture Decision Records

## Overview
This document outlines the core technology choices for the OSU Campus Store eCommerce platform and the rationale behind each decision.

---

## ADR-001: Frontend Framework - React

### What it is
A library for building user interfaces based on reusable components. It is what the user sees.

### Why we chose it

**Component Reusability**
- Build a piece of UI once (e.g., Product Card) and reuse it across the entire application
- Reduces code duplication and improves maintainability

**Industry Standard**
- Used by 40% of professional developers
- Adopted by major companies like Facebook (Meta), Netflix, and Airbnb
- Highly valuable career skill with strong job market demand

**Rich Ecosystem**
- Thousands of pre-built components available
- Massive active community for support and learning resources
- Extensive documentation and tutorials

**Gentle Learning Curve**
- JSX syntax feels similar to combining Java and HTML
- Approachable for business students transitioning to web development

---

## ADR-002: Backend Framework - .NET

### What it is
The "engine" of the application. Handles business logic and APIs using the C# programming language.

### Why we chose it

**Enterprise-Grade Framework**
- Mature, cross-platform framework
- Used by 95% of Fortune 500 companies (e.g., UPS, Starbucks)
- Battle-tested for mission-critical systems

**Strong Typing & Safety**
- C# catches errors at compile time (before code runs)
- Leads to fewer bugs in production compared to loosely typed languages like JavaScript
- Better IntelliSense and autocomplete in development

**Azure Integration**
- Seamless, one-click deployment to Azure cloud
- Native support for Azure services (SQL Database, Blob Storage, App Service)
- Optimized performance on Microsoft infrastructure

**Entity Framework**
- Simplifies database access with Object-Relational Mapping (ORM)
- Write C# code instead of complex SQL queries
- Automatic migrations and schema management

---

## ADR-003: Cloud Infrastructure - Microsoft Azure

### What it is
Microsoft's cloud platform where our database and servers live.

### Why we chose it

**.NET Integration**
- Built to work perfectly with .NET applications
- First-class support for ASP.NET Core hosting
- Optimized performance for Microsoft stack

**Student Benefits**
- $100 in free credits through Azure for Students
- Enough to cover the entire semester's hosting costs
- No credit card required for student accounts

**All-in-One Platform**
- Handles hosting (App Service), databases (Azure SQL), authentication (Azure AD), and monitoring (Application Insights)
- Single dashboard for all infrastructure needs
- No need to manage multiple vendors

**Market Relevance**
- #2 cloud provider globally (behind AWS)
- Strong enterprise adoption
- Valuable resume skill for business and IT careers

---

## ADR-004: Version Control - GitHub

### What it is
The platform where code lives, enabling version control and team collaboration.

### Why we chose it

**Industry Dominance**
- Used by over 100 million developers worldwide
- 90% of professional developers use GitHub
- The standard platform where the world builds software

**AI Assistance**
- Access to GitHub Copilot (AI coding assistant)
- Free for students
- Accelerates development with intelligent code suggestions

**CI/CD Integration**
- Integrates with Azure for automated deployments
- GitHub Actions can automatically deploy to Azure App Service
- Deploy website whenever code is committed (pushed) to main branch

**Portfolio Value**
- Public repos showcase your work to potential employers
- Commit history demonstrates consistent development practices
- README and documentation show communication skills

---


**Last Updated:** February 15, 2026  
**Course:** ACCTMIS 4630 - Business Systems Development  
**Project:** OSU Campus Store eCommerce Platform
