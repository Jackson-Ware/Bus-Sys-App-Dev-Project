using System.Security.Claims;
using BuckeyeMarketplace.API.Data;
using BuckeyeMarketplace.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BuckeyeMarketplace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CartController : ControllerBase
{
    private readonly AppDbContext _context;

    public CartController(AppDbContext context)
    {
        _context = context;
    }

    private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    // GET /api/cart
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CartItem>>> GetCart()
    {
        var userId = GetUserId();
        var items = await _context.CartItems
            .Where(c => c.UserId == userId)
            .Include(c => c.Product)
            .ToListAsync();

        return Ok(items);
    }

    // POST /api/cart
    [HttpPost]
    public async Task<ActionResult<CartItem>> AddToCart([FromBody] AddToCartRequest request)
    {
        if (request.Quantity < 1)
            return BadRequest(new { message = "Quantity must be at least 1." });

        var product = await _context.Products.FindAsync(request.ProductId);
        if (product == null)
            return NotFound(new { message = $"Product with ID {request.ProductId} not found." });

        var userId = GetUserId();

        // If the item is already in cart, increment quantity
        var existing = await _context.CartItems
            .FirstOrDefaultAsync(c => c.UserId == userId && c.ProductId == request.ProductId);

        if (existing != null)
        {
            existing.Quantity += request.Quantity;
            await _context.SaveChangesAsync();
            await _context.Entry(existing).Reference(c => c.Product).LoadAsync();
            return Ok(existing);
        }

        var cartItem = new CartItem
        {
            UserId = userId,
            ProductId = request.ProductId,
            Quantity = request.Quantity,
            AddedDate = DateTime.UtcNow
        };

        _context.CartItems.Add(cartItem);
        await _context.SaveChangesAsync();
        await _context.Entry(cartItem).Reference(c => c.Product).LoadAsync();

        return CreatedAtAction(nameof(GetCart), cartItem);
    }

    // PUT /api/cart/{cartItemId}
    [HttpPut("{cartItemId:int}")]
    public async Task<ActionResult<CartItem>> UpdateQuantity(int cartItemId, [FromBody] UpdateQuantityRequest request)
    {
        if (request.Quantity < 1)
            return BadRequest(new { message = "Quantity must be at least 1." });

        var userId = GetUserId();
        var cartItem = await _context.CartItems
            .Include(c => c.Product)
            .FirstOrDefaultAsync(c => c.Id == cartItemId && c.UserId == userId);

        if (cartItem == null)
            return NotFound(new { message = $"Cart item with ID {cartItemId} not found." });

        cartItem.Quantity = request.Quantity;
        await _context.SaveChangesAsync();

        return Ok(cartItem);
    }

    // DELETE /api/cart/clear  (defined before {cartItemId:int} to avoid route conflict)
    [HttpDelete("clear")]
    public async Task<IActionResult> ClearCart()
    {
        var userId = GetUserId();
        var items = await _context.CartItems
            .Where(c => c.UserId == userId)
            .ToListAsync();

        _context.CartItems.RemoveRange(items);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Cart cleared." });
    }

    // DELETE /api/cart/{cartItemId}
    [HttpDelete("{cartItemId:int}")]
    public async Task<IActionResult> RemoveItem(int cartItemId)
    {
        var userId = GetUserId();
        var cartItem = await _context.CartItems
            .FirstOrDefaultAsync(c => c.Id == cartItemId && c.UserId == userId);

        if (cartItem == null)
            return NotFound(new { message = $"Cart item with ID {cartItemId} not found." });

        _context.CartItems.Remove(cartItem);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Item removed from cart." });
    }
}

public record AddToCartRequest(int ProductId, int Quantity);
public record UpdateQuantityRequest(int Quantity);
