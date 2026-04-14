# Testing Agent Instructions — Buckeye Marketplace

This file provides reusable instructions for AI tools generating or modifying tests in this project.

## Project

**Buckeye Marketplace** — a full-stack marketplace application with an ASP.NET Core backend and a React/TypeScript frontend.

## Test Commands

| Layer    | Command                  | Runner     |
|----------|--------------------------|------------|
| Backend  | `dotnet test`            | xUnit      |
| Frontend | `npm test`               | Vitest     |
| E2E      | `npx playwright test`    | Playwright |

## Backend Tests

**Test project location:** `BuckeyeMarketplace.Tests/`

Before generating backend tests, read the following source files to understand what actually exists:

- `BuckeyeMarketplace/Controllers/CartController.cs`
- `BuckeyeMarketplace/Controllers/ProductsController.cs`
- Models in `BuckeyeMarketplace/Models/`
- Services in `BuckeyeMarketplace/Services/`

**Assertion style:** [FluentAssertions](https://fluentassertions.com/) — use `.Should().Be()`, `.Should().Contain()`, etc.

## Frontend Tests

Before generating frontend tests, read the following source files:

- `client/src/context/CartContext.tsx`
- `client/src/services/cartService.ts`
- `client/src/components/ProductList.tsx`
- `client/src/pages/CartPage.tsx`

**Assertion style:** [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) — prefer `getByRole`, `getByText`, `findBy*` queries; avoid `getByTestId` unless no semantic alternative exists.

## Rules

1. **Never weaken assertions to make tests pass.** If a test is failing, investigate the root cause in the implementation or the test setup — do not widen expected values, swap `.Be()` for `.Contain()`, or otherwise loosen checks to force green.

2. **Never invent classes, methods, or endpoints that don't exist.** Before referencing any type, service, or route in a test, verify it exists in the source files. If something is missing, say so rather than fabricating a placeholder.

3. **Read before you write.** Always inspect the relevant source files listed above before generating tests. Do not assume signatures, return types, or behavior from names alone.

4. **Match the existing test style.** Look at existing tests in `BuckeyeMarketplace.Tests/` before adding new ones and follow the same patterns for setup, teardown, and naming.
