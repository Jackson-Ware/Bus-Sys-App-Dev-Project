using BuckeyeMarketplace.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BuckeyeMarketplace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly AppDbContext _db;

    public AdminController(AppDbContext db)
    {
        _db = db;
    }

    // GET /api/admin/users
    // Returns all registered users. Passwords are never included.
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _db.Users
            .Select(u => new
            {
                u.Id,
                u.Email,
                u.Role,
                u.CreatedAt
            })
            .ToListAsync();

        return Ok(users);
    }

    // GET /api/admin/orders
    // Returns all orders with user email, items, and status.
    [HttpGet("orders")]
    public async Task<IActionResult> GetAllOrders()
    {
        var orders = await _db.Orders
            .Include(o => o.OrderItems)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        var userEmails = await _db.Users
            .ToDictionaryAsync(u => u.Id.ToString(), u => u.Email);

        var result = orders.Select(o => new
        {
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
            UserEmail = userEmails.TryGetValue(o.UserId, out var email) ? email : o.UserId,
            OrderItems = o.OrderItems.Select(oi => new
            {
                oi.Id,
                oi.OrderId,
                oi.ProductId,
                oi.ProductTitle,
                oi.UnitPrice,
                oi.Quantity,
            }),
        });

        return Ok(result);
    }
}
