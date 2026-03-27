# Lab Evaluation Report

**Student Repository**: `Jackson-Ware/Bus-Sys-App-Dev-Project`  
**Date**: 2026-03-27  
**Rubric**: milestone-3/rubric.md

## 1. Build & Run Status

| Component           | Build | Runs | Notes                                                                         |
| ------------------- | ----- | ---- | ----------------------------------------------------------------------------- |
| Backend (.NET)      | ✅    | ✅    | `dotnet build` succeeded. Server starts on http://localhost:5000              |
| Frontend (React/TS) | ✅    | ✅    | `tsc -b && vite build` succeeded. Dev server starts on http://localhost:5173  |
| API Endpoints       | —     | ✅    | All endpoints respond correctly (see details below)                           |

**API Endpoint Verification:**

| Endpoint                   | HTTP Status | Result                                                  |
| -------------------------- | ----------- | ------------------------------------------------------- |
| GET /api/products          | 200         | Returns JSON array with 8 products                      |
| GET /api/products/1        | 200         | Returns single product (Calculus II Textbook, price: 65) |
| GET /api/products/999      | 404         | Returns 404 for non-existent ID                         |

### Project Structure Comparison

| Expected     | Found                    | Status |
| ------------ | ------------------------ | ------ |
| /backend     | /BuckeyeMarketplace.API  | ⚠️ Named differently |
| /frontend    | /client                  | ⚠️ Named differently |
| /docs        | /docs                    | ✅     |

> Note: The backend and frontend directories use non-standard names (`BuckeyeMarketplace.API` and `client` instead of `backend` and `frontend`). The structure is functional but deviates from the solution layout standard.

## 2. Rubric Scorecard

| #   | Requirement                          | Points | Status  | Evidence                                                                                                                                                                                                         |
| --- | ------------------------------------ | ------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | React Product List Page              | 5      | ✅ Met  | `ProductList.tsx` — Fetches and displays all products via `ProductCard` components. Loading state (L40), empty state (L42–44), and error state (L46) all handled. Component hierarchy: ProductList → ProductCard. |
| 2   | React Product Detail Page            | 5      | ✅ Met  | `ProductDetail.tsx` — Separate route `/products/:id` defined in `App.tsx` L9. All fields rendered (title, price, category, seller, date, description, image). Back button navigates to list via `navigate('/')`. |
| 3   | API Endpoint: GET /api/products      | 5      | ✅ Met  | `ProductsController.cs` L102–105 — `GetAllProducts()` returns `Ok(Products)`. In-memory static `List<Product>` used (L10–99). Verified: 200 status, 8 products returned.                                        |
| 4   | API Endpoint: GET /api/products/{id} | 5      | ✅ Met  | `ProductsController.cs` L107–118 — `GetProductById(int id)` returns product or `NotFound()` with message. Verified: 200 for valid ID, 404 for unknown ID.                                                       |
| 5   | Frontend-to-API Integration          | 5      | ✅ Met  | `ProductList.tsx` L15 fetches from `http://localhost:5000/api/products`. `ProductDetail.tsx` L17 fetches by ID. No hardcoded product data in components. Error states handled in both with try/catch.             |

**Total: 25 / 25**

## 3. Detailed Findings

All rubric items are met. No deficiencies to report.

## 4. Action Plan

No corrective actions required — full marks earned.

## 5. Code Quality Coaching (Non-Scoring)

- **Build artifacts committed to git**: `BuckeyeMarketplace.API/bin/` and `BuckeyeMarketplace.API/obj/` directories are tracked in git. These should be added to `.gitignore` and removed from version control with `git rm -r --cached`. Committing compiled binaries bloats the repository and can cause merge conflicts.

- **Hardcoded API base URL**: `ProductList.tsx` L15 and `ProductDetail.tsx` L17 hardcode `http://localhost:5000`. Consider extracting this to an environment variable (e.g., `import.meta.env.VITE_API_URL`) or configuring a Vite proxy in `vite.config.ts` so the URL can change per environment.

- **Boilerplate code not cleaned up**: `WeatherForecast.cs` and `WeatherForecastController.cs` remain from the project template. Removing unused scaffolding keeps the codebase clean and avoids confusion about what's part of the application.

- **Inline styles throughout React components**: All components use inline `style` objects. While functional, this approach makes styling harder to maintain and reuse. Consider CSS modules, a utility framework like Tailwind, or styled-components for better separation of concerns.

- **Non-standard project folder names**: The rubric's solution layout standard specifies `/backend` and `/frontend`. The project uses `/BuckeyeMarketplace.API` and `/client`. Following the standard naming convention improves consistency when working in teams and with course materials.

## 6. Git Practices Coaching (Non-Scoring)

- **Single monolithic commit for Milestone 3**: Commit `02c54df` contains the entire milestone (78 files, 6,091 insertions) in one commit. Breaking work into smaller, incremental commits (e.g., "Add Product model", "Create API controller", "Build ProductList component") makes it easier to review changes, revert issues, and demonstrate progress over time.

- **Commit messages are descriptive**: The commit messages that do exist (e.g., "Milestone 3: Product Catalog vertical slice - React frontend + .NET API") are clear and informative. Continue this practice but apply it to smaller, more frequent commits.

- **Build artifacts in version control**: Binary files (`.dll`, `.exe`, `.pdb`) and generated files (`obj/`) should never be committed. Ensure `.gitignore` covers `bin/`, `obj/`, and other build output directories before the first commit of a new project.

---

**25/25** — All five rubric requirements are fully met with excellent implementation. The coaching notes above (build artifacts in git, hardcoded URLs, boilerplate cleanup, inline styles, commit granularity) are suggestions for professional growth, not scoring deductions.
