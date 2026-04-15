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
public class OrdersController : ControllerBase
{
    private readonly AppDbContext _context;

    public OrdersController(AppDbContext context)
    {
        _context = context;
    }

    private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier)!;

    // POST /api/orders
    [HttpPost]
    public async Task<ActionResult<OrderConfirmationResponse>> PlaceOrder([FromBody] PlaceOrderRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.ShippingName) ||
            string.IsNullOrWhiteSpace(request.ShippingAddress) ||
            string.IsNullOrWhiteSpace(request.ShippingCity) ||
            string.IsNullOrWhiteSpace(request.ShippingState) ||
            string.IsNullOrWhiteSpace(request.ShippingZip))
        {
            return BadRequest(new { message = "All shipping fields are required." });
        }

        var userId = GetUserId();

        var cartItems = await _context.CartItems
            .Where(c => c.UserId == userId)
            .Include(c => c.Product)
            .ToListAsync();

        if (cartItems.Count == 0)
            return BadRequest(new { message = "Your cart is empty." });

        var total = cartItems.Sum(c => (c.Product?.Price ?? 0) * c.Quantity);

        var order = new Order
        {
            UserId = userId,
            ConfirmationNumber = Guid.NewGuid().ToString("N")[..8].ToUpper(),
            OrderDate = DateTime.UtcNow,
            TotalAmount = total,
            Status = "Placed",
            ShippingName = request.ShippingName.Trim(),
            ShippingAddress = request.ShippingAddress.Trim(),
            ShippingCity = request.ShippingCity.Trim(),
            ShippingState = request.ShippingState.Trim(),
            ShippingZip = request.ShippingZip.Trim(),
            OrderItems = cartItems.Select(c => new OrderItem
            {
                ProductId = c.ProductId,
                ProductTitle = c.Product?.Title ?? "Unknown Product",
                UnitPrice = c.Product?.Price ?? 0,
                Quantity = c.Quantity,
            }).ToList()
        };

        _context.Orders.Add(order);
        _context.CartItems.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMyOrders), new OrderConfirmationResponse(
            order.Id,
            order.ConfirmationNumber,
            order.OrderDate,
            order.TotalAmount
        ));
    }

    // PUT /api/orders/{id}/status  (admin only)
    [HttpPut("{id}/status")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] UpdateOrderStatusRequest request)
    {
        var allowed = new[] { "Placed", "Processing", "Shipped", "Delivered", "Cancelled" };
        if (!allowed.Contains(request.Status))
            return BadRequest(new { message = $"Invalid status. Allowed values: {string.Join(", ", allowed)}" });

        var order = await _context.Orders.FindAsync(id);
        if (order == null)
            return NotFound(new { message = $"Order with ID {id} not found." });

        order.Status = request.Status;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // GET /api/orders/mine
    [HttpGet("mine")]
    public async Task<ActionResult<IEnumerable<OrderResponse>>> GetMyOrders()
    {
        var userId = GetUserId();

        var orders = await _context.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.OrderDate)
            .Select(o => new OrderResponse(
                o.Id,
                o.ConfirmationNumber,
                o.OrderDate,
                o.TotalAmount,
                o.Status,
                o.ShippingName,
                o.ShippingAddress,
                o.ShippingCity,
                o.ShippingState,
                o.ShippingZip,
                o.OrderItems.Select(oi => new OrderItemResponse(
                    oi.Id,
                    oi.OrderId,
                    oi.ProductId,
                    oi.ProductTitle,
                    oi.UnitPrice,
                    oi.Quantity
                )).ToList()
            ))
            .ToListAsync();

        return Ok(orders);
    }
}

public record UpdateOrderStatusRequest(string Status);

public record PlaceOrderRequest(
    string ShippingName,
    string ShippingAddress,
    string ShippingCity,
    string ShippingState,
    string ShippingZip
);

public record OrderConfirmationResponse(
    int OrderId,
    string ConfirmationNumber,
    DateTime OrderDate,
    decimal TotalAmount
);

public record OrderItemResponse(
    int Id,
    int OrderId,
    int? ProductId,
    string ProductTitle,
    decimal UnitPrice,
    int Quantity
);

public record OrderResponse(
    int Id,
    string ConfirmationNumber,
    DateTime OrderDate,
    decimal TotalAmount,
    string Status,
    string ShippingName,
    string ShippingAddress,
    string ShippingCity,
    string ShippingState,
    string ShippingZip,
    List<OrderItemResponse> OrderItems
);
