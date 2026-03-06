using BuckeyeMarketplace.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuckeyeMarketplace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private static readonly List<Product> Products =
    [
        new Product
        {
            Id = 1,
            Title = "Calculus II Textbook (Larson, 11th Ed)",
            Description = "Used calculus textbook in good condition. Includes some notes but all pages intact.",
            Price = 65.00m,
            Category = "Textbooks",
            SellerName = "Sarah Chen",
            PostedDate = new DateTime(2026, 1, 15),
            ImageUrl = "https://picsum.photos/300/400?random=1"
        },
        new Product
        {
            Id = 2,
            Title = "Intro to Psychology 101 - Required Textbook",
            Description = "New condition, still in original packaging. Required for PSYCH 101.",
            Price = 95.50m,
            Category = "Textbooks",
            SellerName = "Marcus Johnson",
            PostedDate = new DateTime(2026, 1, 20),
            ImageUrl = "https://picsum.photos/300/400?random=2"
        },
        new Product
        {
            Id = 3,
            Title = "Microeconomics: Principles & Applications Textbook",
            Description = "Good condition with minimal highlighting. Includes access code not used.",
            Price = 75.99m,
            Category = "Textbooks",
            SellerName = "Emma Rodriguez",
            PostedDate = new DateTime(2026, 1, 22),
            ImageUrl = "https://picsum.photos/300/400?random=3"
        },
        new Product
        {
            Id = 4,
            Title = "Official OSU Scarlet & Gray Hoodie - Size L",
            Description = "Authentic Ohio State hoodie. Worn a few times, excellent condition. Classic scarlet color.",
            Price = 45.00m,
            Category = "OSU Clothing",
            SellerName = "Alex Kim",
            PostedDate = new DateTime(2026, 2, 01),
            ImageUrl = "https://picsum.photos/300/400?random=4"
        },
        new Product
        {
            Id = 5,
            Title = "OSU Buckeyes Baseball Cap - Gray",
            Description = "Adjustable cap with embroidered logo. Perfect condition, barely worn.",
            Price = 18.50m,
            Category = "OSU Clothing",
            SellerName = "Jordan Lee",
            PostedDate = new DateTime(2026, 1, 28),
            ImageUrl = "https://picsum.photos/300/400?random=5"
        },
        new Product
        {
            Id = 6,
            Title = "TI-84 Plus Graphing Calculator",
            Description = "Works perfectly. Includes original case and charging cable. Used for engineering courses.",
            Price = 85.00m,
            Category = "Electronics",
            SellerName = "Priya Patel",
            PostedDate = new DateTime(2026, 1, 18),
            ImageUrl = "https://picsum.photos/300/400?random=6"
        },
        new Product
        {
            Id = 7,
            Title = "OSU Football Game Jersey - Treveyon #5",
            Description = "Official replica jersey, worn once, like new. Perfect for game day or tailgate.",
            Price = 55.00m,
            Category = "Fan Gear",
            SellerName = "Tyler Brooks",
            PostedDate = new DateTime(2026, 2, 05),
            ImageUrl = "https://picsum.photos/300/400?random=7"
        },
        new Product
        {
            Id = 8,
            Title = "OSU Alumni Challenge Coin",
            Description = "Commemorative challenge coin with Brutus Buckeye. Great collectible for any student.",
            Price = 12.99m,
            Category = "Fan Gear",
            SellerName = "Casey Williams",
            PostedDate = new DateTime(2026, 2, 03),
            ImageUrl = "https://picsum.photos/300/400?random=8"
        }
    ];

    [HttpGet]
    public ActionResult<IEnumerable<Product>> GetAllProducts()
    {
        return Ok(Products);
    }

    [HttpGet("{id}")]
    public ActionResult<Product> GetProductById(int id)
    {
        var product = Products.FirstOrDefault(p => p.Id == id);
        
        if (product == null)
        {
            return NotFound(new { message = $"Product with ID {id} not found." });
        }
        
        return Ok(product);
    }
}
