# E2E Test Session — Playwright

## Overview

This document describes the Playwright end-to-end test authored and debugged with AI assistance for Milestone 5.

---

## Prompts Given to the Agent

The following prompts were provided during the session:

1. Write a Playwright E2E test that registers a new user, logs in, adds a product to the cart, and verifies the cart total updates.
2. The test should use `@playwright/test` and target `http://localhost:5173`.
3. Make the test resilient to small timing delays (use `waitFor` where appropriate).

---

## First Failure — Strict Mode Locator Error

The initial test used a `div` locator to find the page heading after login:

```ts
await expect(page.locator('div', { hasText: 'Welcome' })).toBeVisible();
```

Playwright's strict mode raised an error because multiple `div` elements on the page contained the text "Welcome", making the locator ambiguous:

```
Error: strict mode violation: locator('div', { hasText: 'Welcome' }) resolved to 3 elements
```

---

## Correction Applied — Switched to `getByRole('heading')`

The locator was replaced with a semantic role-based query that targets only the `<h1>`/`<h2>` heading element:

```ts
await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
```

This resolved to exactly one element, satisfying strict mode and making the assertion meaningful.

---

## Final Result

- **Tests run:** 1  
- **Passed:** 1  
- **Failed:** 0  

The test successfully registers a new user, logs in, navigates to the product listing, adds an item to the cart, and asserts that the cart badge/total reflects the added item.
