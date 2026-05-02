# User Guide — Buckeye Marketplace

**OSU Campus Store eCommerce Platform**  
Course: ACCTMIS 4630 | Student: Jackson Ware | Spring 2026

**Live App:** https://yellow-grass-094e1190f.7.azurestaticapps.net

---

## Getting Started

### Creating an Account

1. Open the app at the live URL above
2. Click **Register** in the top navigation bar
3. Enter your email address and a password
4. Click **Register** — you will be redirected to the homepage automatically

### Logging In

1. Click **Login** in the top navigation bar
2. Enter your email and password
3. Click **Login** — you will be redirected to the homepage

### Logging Out

Click your email or the **Logout** button in the navigation bar to end your session.

---

## Browsing Products

### Viewing the Product Catalog

After logging in you will see the full product catalog on the homepage. Products are displayed as cards showing:
- Product image
- Product name
- Price
- Category (Textbook, Clothing, Fan Gear, etc.)

### Viewing a Product Detail

Click on any product card to open the product detail page. Here you can see:
- Full product description
- Price
- Stock availability
- Quantity selector
- Add to Cart button

---

## Shopping Cart

### Adding Items to Your Cart

**From the product list:**
1. Click on a product to open its detail page
2. Use the **+** and **−** buttons to select a quantity
3. Click **Add to Cart**
4. The cart icon in the header will update to show the number of items in your cart

### Viewing Your Cart

Click the **Cart** icon or **Cart** link in the navigation bar to open your cart. You will see:
- All items you have added
- Quantity for each item
- Price per item and line total
- Order summary with subtotal and total

### Updating Quantities

On the cart page, use the **+** and **−** buttons next to each item to adjust quantities. The totals update automatically.

### Removing Items

Click the **Remove** button (or trash icon) next to any item to remove it from your cart.

### Clearing the Cart

Click **Clear Cart** at the bottom of the cart page to remove all items at once.

---

## Placing an Order

1. Add items to your cart
2. Navigate to your cart
3. Review your items and total
4. Click **Proceed to Checkout**
5. Confirm your order
6. You will receive an order confirmation and be redirected to your order history

---

## Viewing Order History

1. Click your account name or navigate to **Orders** in the navigation bar
2. You will see a list of all your past orders with:
   - Order date
   - Order total
   - Order status (Pending, Processing, Shipped, Delivered)
   - Items ordered

---

## Tips

- Your cart is saved between sessions — items stay in your cart even if you close the browser
- You must be logged in to add items to your cart or place orders
- Prices shown include all fees — no hidden charges at checkout

---
---

# Admin Guide — Buckeye Marketplace

**For administrators only. Admin credentials required.**

---

## Accessing the Admin Dashboard

1. Log in with your admin account credentials
   - Default admin email: `admin@buckeyemarket.com`
2. The navigation bar will show an **Admin** link visible only to admin accounts
3. Click **Admin** to access the admin dashboard

---

## Managing Products

### Viewing All Products

From the admin dashboard, click **Products** to see a table of all products in the catalog including name, price, category, and stock level.

### Adding a New Product

1. Click **Add Product** on the products page
2. Fill in the product form:
   - **Title** — product name
   - **Description** — full product description
   - **Price** — price in USD (e.g. 29.99)
   - **Category** — select from available categories
   - **Seller Name** — vendor or seller
   - **Image URL** — link to product image
   - **Stock** — number of units available
3. Click **Save** to add the product to the catalog

### Editing a Product

1. Find the product in the products table
2. Click **Edit** next to the product
3. Update any fields as needed
4. Click **Save** to apply changes

### Deleting a Product

1. Find the product in the products table
2. Click **Delete** next to the product
3. Confirm the deletion when prompted

> ⚠️ Deleting a product is permanent and cannot be undone.

---

## Managing Orders

### Viewing All Orders

From the admin dashboard, click **Orders** to see all customer orders across the platform. Each order shows:
- Order ID
- Customer email
- Order date
- Total amount
- Current status

### Updating Order Status

1. Find the order in the orders table
2. Click **Edit** or the order ID to open the order detail
3. Change the **Status** field to one of:
   - **Pending** — order received, not yet processed
   - **Processing** — order is being prepared
   - **Shipped** — order has been dispatched
   - **Delivered** — order has been received by customer
4. Click **Save** to update the status

The customer will see the updated status in their order history.

---

## Admin Credentials & Security

- Admin accounts are seeded automatically on first deployment
- The admin password is stored securely as a BCrypt hash — never in plaintext
- JWT tokens expire after a set period — admins must re-login after token expiry
- All admin endpoints require both authentication and the Admin role — regular user tokens cannot access admin routes
- If you need to reset the admin password, update the `Seed__AdminPassword` environment variable in Azure App Service and restart the application

---

## API Access (Advanced)

The backend REST API is available for direct access. In local development, Swagger UI is available at `http://localhost:5000/swagger` for interactive API documentation and testing. All admin endpoints require a valid JWT with the Admin role in the `Authorization: Bearer <token>` header.
