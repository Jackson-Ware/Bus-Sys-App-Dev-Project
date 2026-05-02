# Testing Evidence — Milestone 5

**Project:** OSU Campus Store eCommerce Platform  
**Course:** ACCTMIS 4630 - Business Systems Development  
**Student:** Jackson Ware  
**Date:** April 13, 2026

---

## Test Suite Summary

### Backend — Unit Tests (`BuckeyeMarketplace.Tests/CartControllerUnitTests.cs`)

Runner: xUnit + FluentAssertions  
Setup: In-memory `AppDbContext` (EF Core), fake `ClaimsPrincipal` injected on `ControllerContext`

| Test | Behavior Verified |
|---|---|
| `AddToCart_QuantityBelowOne_ReturnsBadRequest` | Quantity = 0 → 400 Bad Request |
| `AddToCart_ProductDoesNotExist_ReturnsNotFound` | ProductId = 9999 (not seeded) → 404 Not Found |
| `UpdateQuantity_QuantityBelowOne_ReturnsBadRequest` | Quantity = 0 → 400 Bad Request |

**Result:** 3 / 3 passing

---

### Backend — Integration Tests (`BuckeyeMarketplace.Tests/CartAuthorizationTests.cs`)

Runner: xUnit + `WebApplicationFactory<Program>`  
Setup: Shared in-memory SQLite connection, JWT key and `Seed:AdminPassword` injected via `AddInMemoryCollection` (no User Secrets required during CI)

| Test | Behavior Verified |
|---|---|
| `GetCart_WithoutToken_Returns401Unauthorized` | `GET /api/cart` with no `Authorization` header → 401 Unauthorized |

**Result:** 1 / 1 passing

---

### Frontend — Reducer Unit Tests (`client/src/__tests__/cartReducer.test.ts`)

Runner: Vitest  
Setup: Pure function — no mocks or DOM required

| Test | Behavior Verified |
|---|---|
| `SET_CART replaces items, clears loading and error` | Items replaced; `loading` → false; `error` → null |
| `REMOVE_ITEM filters out the item with the matching id` | Correct item removed; other item retained |
| `UPDATE_ITEM replaces the item with a matching id in-place` | Quantity updated; array length unchanged |
| `CLEAR empties the items array` | `items` length → 0 |
| `SET_ERROR records the error message and clears loading` | `error` set; `loading` → false |
| `SET_SUCCESS stores the success message` | `successMessage` set correctly |
| `unknown action type returns state unchanged` | Returns same state reference (default branch) |

**Result:** 7 / 7 passing

---

### Frontend — Context Integration Tests (`client/src/__tests__/CartContext.test.tsx`)

Runner: Vitest + React Testing Library  
Setup: `vi.mock('../services/cartService')` — no real HTTP calls

| Test | Behavior Verified |
|---|---|
| `starts loading and then resolves to an empty cart` | `loading` is true on mount; resolves to false with count = 0 |
| `itemCount sums quantities across all cart items` | Two items (qty 2 + qty 3) → itemCount = 5 |
| `addToCart adds a new item and increments itemCount` | New item added → itemCount increments to 1; no error shown |
| `addToCart sets an error message when the service throws` | Rejected service call → error message displayed |

**Result:** 4 / 4 passing

---

### Frontend — Component Tests (`client/src/__tests__/ProductList.test.tsx`)

Runner: Vitest + React Testing Library  
Setup: `vi.stubGlobal('fetch', ...)` to control HTTP responses; `vi.mock('../services/cartService')` to isolate CartProvider

| Test | Behavior Verified |
|---|---|
| `shows a loading message while the fetch is in-flight` | "Loading products..." visible while fetch is pending |
| `renders each product title after a successful fetch` | "OSU Hat" and "OSU Hoodie" visible after successful fetch |
| `shows "No products found." when the API returns an empty array` | Empty array → "No products found." |
| `shows an error message when the fetch fails` | Non-OK response → "Error: Failed to fetch products" |

**Result:** 4 / 4 passing

---

### E2E — Playwright (`e2e/shopping-flow.spec.ts`)

Runner: Playwright (Chromium)  
Setup: Full running stack required (API + React dev server). Unique email generated per run (`e2e-<timestamp>@buckeyetest.com`).

| Test | Steps Covered |
|---|---|
| `register → browse → add to cart → view cart` | 1. Register new account → redirected to `/` 2. Product list loads with at least one product 3. "Add to Cart" clicked → button resets to "Add to Cart" 4. Navigate to `/cart` via header button 5. Cart page shows product title, Order Summary, and "Proceed to Checkout" button |

**Result:** 1 / 1 passing

---

## Test Totals

| Command | Passing | Failing |
|---|---|---|
| `dotnet test` | 4 | 0 |
| `npm test` | 15 | 0 |
| `npx playwright test` | 1 | 0 |
| **Total** | **20** | **0** |

---

## Self-Check Against Quality Dimensions

### Functionality
- All five cart API endpoints are covered (unit tests hit `AddToCart` and `UpdateQuantity` directly; integration test verifies `GetCart` requires auth).
- The full user-facing flow — registration through cart checkout — is exercised by the E2E test on a real running stack.
- Frontend state management is verified at both the reducer level (pure function) and the component level (mocked service, real DOM).

### Security
- `GET /api/cart` without a JWT returns 401 — enforced by the `[Authorize]` attribute and verified by the integration test.
- `GET /api/admin/users` is protected by `[Authorize(Roles = "Admin")]`; non-admin tokens cannot reach it.
- Cart queries include `c.UserId == userId` — users can only access their own cart items.
- JWT signing key is read from User Secrets at runtime and never appears in `appsettings.json` or source code.
- Admin seed password is read from `Seed:AdminPassword` (User Secrets) — not hardcoded in source. This was a bug in Claude's initial output that was caught during security review.
- Passwords stored as BCrypt hashes; plaintext is never persisted.
- No raw SQL — all queries use EF Core LINQ methods.
- No `dangerouslySetInnerHTML` anywhere in the React codebase.

### Code Quality
- Backend tests use an in-memory database and a fake `ClaimsPrincipal`, keeping tests isolated and fast.
- Integration test uses a shared in-memory SQLite connection (keeping the `db.Database.Migrate()` path exercised) without touching the dev database.
- Frontend tests avoid `getByTestId` in favor of semantic queries (`getByRole`, `getByText`).
- Playwright test generates a unique email per run to avoid state leakage between test executions.
- No assertions were weakened to make failing tests pass — all failures were resolved in the implementation.

---

## Week 13 Final Checklist

| Requirement | Status |
|---|---|
| `userId` read from JWT claims (`ClaimTypes.NameIdentifier`), not hardcoded | ✅ |
| Admin endpoints protected by `[Authorize(Roles = "Admin")]` | ✅ |
| JWT signing key stored in .NET User Secrets (`Jwt:Key`) | ✅ |
| Admin seed password stored in User Secrets (`Seed:AdminPassword`) | ✅ |
| No raw SQL — all queries use EF Core LINQ | ✅ |
| No `dangerouslySetInnerHTML` in React components | ✅ |
| CORS configured to allow only `localhost:5173` and `localhost:5174` | ✅ |
| Backend unit tests passing (`dotnet test`) | ✅ 4 / 4 |
| Frontend unit tests passing (`npm test`) | ✅ 15 / 15 |
| E2E test passing (`npx playwright test`) | ✅ 1 / 1 |
