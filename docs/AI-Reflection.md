# AI Usage Documentation

## Project Information
**Project:** OSU Campus Store eCommerce Platform  
**Course:** ACCTMIS 4630 - Business Systems Development  
**Milestone:** Milestone 2 - Architecture Design & Frontend Foundation  
**Student:** Jackson Ware  
**Date:** February 15, 2026

---

## AI Tool Used
**Tool:** Claude (Anthropic)  
**Version:** Claude Sonnet 4.5  
**Access Method:** claude.ai web interface

---

## Tasks Where AI Was Used

### 1. **Systems Architecture Diagram**
**What I Asked For:**
- Explanation of what a systems architecture diagram is
- Help understanding the requirements

**What AI Provided:**
- Conceptual explanation of architecture diagrams
- Guidance on components to include (frontend, backend, database)

**How I Used It:**
- Used the explanation to understand assignment requirements
- Created my own architecture diagram based on the guidance

**My Contribution:**
- Made decisions about technology stack
- Organized the diagram layout
- Applied it to my specific project context

---

### 2. **Entity Relationship Diagram (ERD)**
**What I Asked For:**
- High-level overview of what an ERD is
- Explanation of how it supports user stories
- Help with relationship types (1:N, M:N)

**What AI Provided:**
- Definition of ERD and its purpose
- Explanation of relationship mappings
- Examples of how tables connect

**How I Used It:**
- Used the concepts to understand database design
- Applied relationship types to my 9 tables

**My Contribution:**
- Decided to hand-draw the ERD
- Determined which tables to include based on my features
- Wrote my own explanation of how schema supports user stories

---

### 3. **Architecture Decision Records (Technology Stack)**
**What I Asked For:**
- Help documenting why we chose specific technologies (React, .NET, Azure, GitHub)

**What AI Provided:**
- Structured format for documenting technology decisions
- Examples of justifications for each technology choice
- Industry context and statistics

**How I Used It:**
- Used the structure to organize my technology documentation
- Incorporated the reasoning into my own document

**My Contribution:**
- Selected which technologies to include
- Edited and personalized the justifications
- Organized the final document structure
- Made it specific to my project requirements

---

### 4. **Component Architecture (Atomic Design)**
**What I Asked For:**
- Explanation of Atomic Design principles
- Help creating component hierarchy for Product Catalog feature

**What AI Provided:**
- Definitions of Atoms, Molecules, Organisms, Templates
- Example component hierarchy
- Visual structure diagram

**How I Used It:**
- Used the framework to organize my UI components
- Applied the definitions from my course materials

**My Contribution:**
- Simplified the structure to match assignment scope
- Incorporated definitions from my own class learnings
- Scoped components specifically to Product Catalog feature
- Created the final markdown document

---

### 5. **GitHub and Documentation Support**
**What I Asked For:**
- How to upload files to GitHub
- How to create markdown files
- How to structure documentation

**What AI Provided:**
- Step-by-step instructions for GitHub operations
- Markdown formatting guidance
- File organization suggestions

**How I Used It:**
- Followed instructions to add files to my repository
- Used markdown syntax for documentation

**My Contribution:**
- Executed all GitHub operations myself
- Organized my repository structure
- Made decisions about file naming and placement

---

## AI-Generated vs. Student-Created Content

### **AI-Generated Content:**
- Initial drafts of documentation structure
- Examples and templates for architecture documents
- Explanations of technical concepts
- Formatting and markdown syntax

### **Student-Created Content:**
- All final decisions about project architecture
- Selection of technologies for my specific project
- Customization of all documents to fit my project
- All content review, editing, and validation
- Project-specific context and requirements
- Final document organization and submission

---

## Learning Outcomes

**What I Learned:**
- How to structure architecture documentation professionally
- Understanding of Atomic Design principles
- How database relationships support user stories
- Best practices for technology stack documentation
- GitHub workflow and markdown documentation

**How AI Helped My Learning:**
- Provided clear explanations when I was confused
- Offered examples that I could adapt
- Helped me understand industry-standard practices
- Saved time on formatting so I could focus on content

**What I Did Independently:**
- Made all architectural decisions
- Applied concepts to my specific project requirements
- Created hand-drawn ERD to ensure understanding
- Reviewed and validated all AI-generated content
- Organized and submitted all deliverables

---

## Ethical Use Statement

I used Claude as a learning assistant and documentation aid, similar to how I would use a textbook, tutorial, or office hours with a TA. All architectural decisions, technology choices, and final content were my own. I reviewed, understood, edited, and validated all AI-generated content before including it in my project. The AI served as a tool to help explain concepts and provide structure, but the intellectual work and decision-making were mine.

---

**Signature:** Jackson Ware  
**Date:** February 15, 2026

---

---

# AI Usage Documentation — Milestone 4

## Project Information
**Project:** OSU Campus Store eCommerce Platform  
**Course:** ACCTMIS 4630 - Business Systems Development  
**Milestone:** Milestone 4 - Shopping Cart Feature  
**Student:** Jackson Ware  
**Date:** March 31, 2026

---

## AI Tools Used
- **Claude Code** (VS Code extension) — code generation and implementation
- **Claude.ai** (chat) — planning, guidance, and troubleshooting

---

## Tasks Where AI Was Used

### 1. Project Analysis
**What I Asked For:**
> "Explore the project at c:\Users\jacks\Documents\Bus-Sys-App-Dev-Project and give me a comprehensive picture of the tech stack, what has already been built, and the overall project architecture."

**What AI Provided:**
- Full analysis of the existing Milestone 3 codebase
- Identified React 19 + TypeScript + Vite frontend, .NET 10 backend, and hardcoded product data with no database

**My Contribution:**
- Directed the analysis toward what I needed to plan Milestone 4
- Used the findings to determine what needed to be built (database layer, cart feature)

---

### 2. Entity Framework Core & Database Setup
**What I Asked For:**
> "Set up Entity Framework Core in my .NET project. Install the necessary NuGet packages, create an AppDbContext, create Cart and CartItem models with proper relationships to the existing Product model, add the connection string to appsettings.json using SQLite, register the DbContext in Program.cs, and generate the initial EF migration for the cart tables."

**What AI Generated:**
- `CartItem.cs` — model with Id, UserId, ProductId, Quantity, AddedDate, and Product navigation property
- `AppDbContext.cs` — DbSets for Products and CartItems, with all 8 products seeded
- `Program.cs` — registered DbContext, configured auto-migration on startup
- `appsettings.json` — SQLite connection string
- `.gitignore` — added `bin/`, `obj/`, `.vs/`, `*.db`
- EF migration `InitialCreate` — Products and CartItems tables

**My Contribution:**
- Reviewed the generated models and migration for correctness
- Verified the database schema matched the ERD from Milestone 2

---

### 3. Cart API (Backend)
**What I Asked For:**
> "Create a CartController.cs with all 5 cart endpoints: GET /api/cart, POST /api/cart, PUT /api/cart/{cartItemId}, DELETE /api/cart/{cartItemId}, and DELETE /api/cart/clear. Use a hardcoded userId of 1 for now."

**What AI Generated:**
- `CartController.cs` — all 5 endpoints with proper HTTP status codes
- `ProductsController.cs` — refactored to use AppDbContext instead of hardcoded list

**My Contribution:**
- Tested each endpoint and confirmed correct behavior
- Verified HTTP status codes matched RESTful conventions

---

### 4. Cart Frontend (React)
**What I Asked For:**
> "Create a CartContext.tsx using useReducer, a useCart.ts custom hook, cart item count badge in the header, CartPage.tsx, CartItem and CartSummary components, connect everything to the backend API with loading states and error handling."

**What AI Generated:**
- `types/CartItem.ts` — TypeScript interface
- `services/cartService.ts` — service layer for all 5 API calls
- `context/CartContext.tsx` — useReducer cart state with CartProvider and useCart hook
- `components/Header.tsx` — scarlet header with live cart count badge
- `components/CartPage.tsx` — full cart page with loading, error, and empty states
- `components/CartItemRow.tsx` — quantity controls, remove button, line total
- `components/CartSummary.tsx` — subtotal, total, clear cart button
- `components/ProductCard.tsx` — updated with Add to Cart button
- `components/ProductDetail.tsx` — updated with quantity selector and Add to Cart button
- `App.tsx` — wrapped in CartProvider, added Header and `/cart` route

**My Contribution:**
- Reviewed all generated components for correctness and consistency
- Manually tested every user flow end-to-end

---

## Modifications Made

No major modifications were needed — the generated code worked as expected after testing. All features were verified manually.

---

## Testing Results

All features tested and confirmed working:

- 8 products display correctly from the database
- Add to Cart updates the header badge count
- Cart page shows items, quantities, and totals
- Quantity updates and removals work correctly
- Cart persists after page refresh (SQLite database)

---

## AI-Generated vs. Student-Created Content

### AI-Generated Content:
- All model, controller, and React component code
- Database context, migration, and seeding logic
- Service layer and state management (CartContext)

### Student-Created Content:
- Directed all prompts and scoped the feature requirements
- Reviewed and validated every generated file before use
- Performed all manual testing and verified correctness
- Made architectural decisions (SQLite, hardcoded userId, route structure)
- Integrated the feature into the existing project

---

## Learning Outcomes

**What I Learned:**
- How Entity Framework Core models, migrations, and DbContext work together
- How to manage shared state in React with useReducer and Context API
- How a REST API and a React frontend communicate end-to-end
- How SQLite persistence works in a .NET application

**How AI Helped My Learning:**
- Explained EF Core concepts as it generated the code
- Demonstrated patterns (useReducer, service layer) I can apply in future work
- Let me focus on understanding the system rather than syntax

**What I Did Independently:**
- Defined the feature scope and requirements for Milestone 4
- Directed and refined all prompts
- Reviewed, tested, and validated all generated code
- Made all decisions about project structure and implementation approach

---

## Ethical Use Statement

I used Claude Code and Claude.ai as implementation assistants for Milestone 4. I directed all prompts, reviewed every file that was generated, and manually tested all features before considering them complete. The AI accelerated development, but understanding the code and verifying its correctness was my responsibility. All architectural and design decisions were my own.

---

**Signature:** Jackson Ware  
**Date:** March 31, 2026

---

---

# AI Usage Documentation — Milestone 5

## Project Information
**Project:** OSU Campus Store eCommerce Platform  
**Course:** ACCTMIS 4630 - Business Systems Development  
**Milestone:** Milestone 5 - Authentication, Authorization & Testing  
**Student:** Jackson Ware  
**Date:** April 13, 2026

---

## AI Tools Used
- **Claude Code** (VS Code extension) — test generation, security review, implementation guidance
- **Claude.ai** (chat) — planning and troubleshooting

---

## Tasks Where AI Was Used

### 1. Test Suite Generation
**What I Asked For:**
> "Write backend xUnit tests for CartController. The controller now reads userId from JWT claims via `User.FindFirstValue(ClaimTypes.NameIdentifier)` — not hardcoded. Cover: AddToCart with quantity below 1 returns 400, AddToCart with a nonexistent product returns 404, UpdateQuantity with quantity below 1 returns 400. Use an in-memory DbContext, set up a fake ClaimsPrincipal on the ControllerContext, and use FluentAssertions."

**What AI Provided:**
- `CartControllerUnitTests.cs` — 3 unit tests covering bad input and missing product cases
- `CartAuthorizationTests.cs` — 1 integration test using `WebApplicationFactory` to assert that `GET /api/cart` without a JWT returns 401
- `cartReducer.test.ts` — 7 tests covering all `cartReducer` action types (SET_CART, REMOVE_ITEM, UPDATE_ITEM, CLEAR, SET_ERROR, SET_SUCCESS, unknown)
- `CartContext.test.tsx` — 4 tests for `CartProvider`/`useCart`: loading state, item count, addToCart success, addToCart error
- `ProductList.test.tsx` — 4 tests: loading state, renders products, empty array, fetch error
- `shopping-flow.spec.ts` — 1 Playwright E2E test: register → browse → add to cart → view cart

**My Contribution:**
- Directed each prompt and specified which behaviors to cover
- Reviewed every generated test file against the actual source code before accepting it
- Ran all suites and confirmed results before including them

---

### 2. One Thing Claude Got Wrong

**What happened:**  
When Claude first generated the admin seeding block in `Program.cs`, it hardcoded the admin password directly in source as a string literal:

```csharp
// Claude's original (wrong) version
PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!")
```

**How I caught it:**  
During a security review of the generated `Program.cs`, I noticed the plaintext password sitting in source code — meaning it would have been committed to the repository and visible in version history to anyone with repo access.

**How I fixed it:**  
I directed Claude to replace the literal with a configuration lookup backed by .NET User Secrets:

```csharp
// Fixed version
var adminPassword = builder.Configuration["Seed:AdminPassword"]
    ?? throw new InvalidOperationException(
        "Seed:AdminPassword is not configured. Run: dotnet user-secrets set \"Seed:AdminPassword\" \"<strong-password>\"");

PasswordHash = BCrypt.Net.BCrypt.HashPassword(adminPassword)
```

The `Seed:AdminPassword` value now lives in the local User Secrets store (never committed) and is injected at runtime. The integration test factory supplies its own test value via `AddInMemoryCollection`.

---

## Test Commands and Results

| Command | Runner | Result |
|---|---|---|
| `dotnet test` | xUnit | **4 passing**, 0 failing |
| `npm test` | Vitest | **15 passing**, 0 failing |
| `npx playwright test` | Playwright | **1 passing**, 0 failing |

---

## AI-Generated vs. Student-Created Content

### AI-Generated Content:
- All test file scaffolding and assertion logic
- `WebApplicationFactory` setup for integration tests
- Vitest mock patterns for `cartService`

### Student-Created Content:
- Identified which behaviors warranted test coverage
- Directed all prompts with specific requirements
- Caught and corrected the hardcoded admin password security issue
- Reviewed every test against the actual source code signatures
- Ran all suites and validated results independently

---

## Learning Outcomes

**What I Learned:**
- How `WebApplicationFactory` enables full-stack integration tests without a live server
- How JWT claims flow from middleware into controller logic and how to replicate that in unit tests
- The risk of committing secrets in source code and how .NET User Secrets mitigates it
- How Vitest's `vi.mock` and `vi.stubGlobal` isolate components from real network calls

**What I Did Independently:**
- Identified the hardcoded-password vulnerability before it was committed
- Directed the scope and structure of all five test files
- Validated every test result against the running application

---

## Ethical Use Statement

I used Claude Code as a test-generation assistant for Milestone 5. I directed all prompts, reviewed every file against the real source code, and ran all test suites myself to confirm correctness. The security issue with the hardcoded admin password was caught through my own review — not by the AI. All decisions about what to test and what constitutes a passing result were my own.

---

**Signature:** Jackson Ware  
**Date:** April 13, 2026
