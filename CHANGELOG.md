# Changelog

## Milestone 5

### JWT Authentication
- Added `Microsoft.AspNetCore.Authentication.JwtBearer` and `BCrypt.Net-Next` packages.
- Implemented `/api/auth/register` and `/api/auth/login` endpoints in `AuthController`.
- Passwords are hashed with BCrypt before storage; login returns a signed JWT containing the user's ID and role.
- JWT secret is stored in .NET User Secrets (never in source).
- All non-public endpoints require a valid `Bearer` token via `[Authorize]`.

### Hardcoded `userId` Removed from CartController
- Previously the cart endpoints accepted a `userId` from the URL, allowing any caller to read or modify any user's cart.
- `userId` is now derived exclusively from the authenticated JWT claims, closing the IDOR vulnerability.

### Hardcoded Admin Password Moved to User Secrets
- The admin seed account password was previously embedded in `AppDbContext.cs`.
- The password is now read from `IConfiguration` (backed by User Secrets in development) so no credential appears in source control.

### Order Flow Added
- New `Order` and `OrderItem` models with a corresponding EF Core migration.
- `OrdersController` exposes:
  - `POST /api/orders` — converts the current cart into a placed order.
  - `GET /api/orders` — returns the authenticated user's order history.
- Frontend pages: `CheckoutPage`, `OrderConfirmationPage`, and `OrderHistoryPage`.
- `orderService.ts` handles API communication for order operations.

### Admin Product CRUD Added
- `AdminController` exposes authenticated, role-restricted endpoints for creating, updating, and deleting products.
- `AdminDashboard` and `AdminProductsPage` React components provide a management UI visible only to admin-role users.
- `adminService.ts` handles API communication for admin operations.

---

## Milestone 4

- Added Entity Framework Core with SQLite database.
- Implemented shopping cart API (`CartController`) and cart UI with React Context.
- Introduced `AppDbContext`, `Cart`, and `CartItem` models.

## Milestone 3 and earlier

- Initial product listing, static frontend, and basic ASP.NET Core API setup.
