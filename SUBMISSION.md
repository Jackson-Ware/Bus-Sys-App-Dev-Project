# Milestone 5 Submission

## Test Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@buckeyemarket.com | Admin123! |
| Regular User | Register a new account at `/register` on the running app |

> **Note:** The regular user account must be created by registering through the UI or the `/api/auth/register` endpoint, as user data is stored in a local SQLite database that is not committed to the repo.

## Security Practices Applied

### 1. JWT Secret Key Stored in User Secrets
The JWT signing key is never hardcoded in source files or committed to version control. It is stored using the .NET User Secrets manager (`dotnet user-secrets`) and accessed via `IConfiguration`. This prevents accidental credential exposure in git history.

### 2. User Identity Resolved from JWT, Not the URL
Cart and order endpoints derive the authenticated user's ID directly from the validated JWT claims (`User.FindFirst(ClaimTypes.NameIdentifier)`). No user ID is accepted from URL parameters or request bodies for identity-sensitive operations, eliminating IDOR (Insecure Direct Object Reference) vulnerabilities.

### 3. BCrypt Password Hashing
User passwords are never stored in plaintext. Registration hashes passwords with BCrypt (via `BCrypt.Net-Next`) before persisting them, and login uses `BCrypt.Verify` for constant-time comparison. BCrypt's built-in salt and cost factor protect against rainbow-table and brute-force attacks.

### 4. Role-Based Admin Enforcement via `[Authorize(Roles = "Admin")]`
Admin endpoints (product CRUD, user listing) are decorated with `[Authorize(Roles = "Admin")]`. The role is embedded in the JWT at login time and verified server-side on every request — the client cannot escalate privileges by modifying a local value.

### 5. No Raw SQL / Parameterized Queries via EF Core
All database access goes through Entity Framework Core with LINQ queries. EF Core uses parameterized queries exclusively, which prevents SQL injection without any additional effort from the developer.

## Related Documentation

- [AI-USAGE.md](AI-USAGE.md) — log of AI tool usage throughout the project
