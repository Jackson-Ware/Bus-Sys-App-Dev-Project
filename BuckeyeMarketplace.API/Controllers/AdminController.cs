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
}
