import { test, expect } from '@playwright/test';

// Unique email per run so the account is always fresh
const email = `e2e-${Date.now()}@buckeyetest.com`;
const password = 'Password123!';

test.describe('Buckeye Marketplace – shopping flow', () => {

  test('register → browse → add to cart → view cart', async ({ page }) => {

    // ── 1. Register a new user ──────────────────────────────────────────────
    await page.goto('/register');
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();

    await page.getByLabel('Email').fill(email);
    // exact:true prevents matching the "Confirm Password" label's text
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByLabel('Confirm Password').fill(password);

    await page.getByRole('button', { name: 'Create Account' }).click();

    // After registration the app redirects to the product list
    await page.waitForURL('/');

    // ── 2. Browse the product list ──────────────────────────────────────────
    // The page heading rendered by ProductList
    await expect(page.getByRole('heading', { name: 'OSU Campus Store' }).first()).toBeVisible();

    // Wait for at least one product card to appear
    const firstAddToCartBtn = page.getByRole('button', { name: 'Add to Cart' }).first();
    await expect(firstAddToCartBtn).toBeVisible();

    // Capture the first product title (each card renders its name in an <h3>)
    // The first h3 corresponds to the same card as the first "Add to Cart" button
    const productTitle = await page.getByRole('heading', { level: 3 }).first().innerText();

    // ── 3. Add the first item to the cart ──────────────────────────────────
    await firstAddToCartBtn.click();

    // The button briefly shows "Adding…" then reverts; wait for it to settle
    await expect(firstAddToCartBtn).toHaveText('Add to Cart', { timeout: 10_000 });

    // ── 4. Navigate to the cart ─────────────────────────────────────────────
    // Click the Cart button in the header (text may include a badge count, e.g. "Cart 1")
    await page.getByRole('button', { name: /^Cart/ }).click();
    await page.waitForURL('/cart');

    // ── 5. Verify the cart shows the item ──────────────────────────────────
    await expect(page.getByRole('heading', { name: 'Your Cart' })).toBeVisible();

    // At least one cart row should show the product title we added
    await expect(page.getByText(productTitle)).toBeVisible();

    // The order summary panel must be present
    await expect(page.getByRole('heading', { name: 'Order Summary' })).toBeVisible();

    // "Proceed to Checkout" button exists (checkout page is not yet implemented,
    // so we only assert its presence, not click it)
    await expect(page.getByRole('button', { name: 'Proceed to Checkout' })).toBeVisible();
  });

});
