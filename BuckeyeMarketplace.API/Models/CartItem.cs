namespace BuckeyeMarketplace.API.Models;

public class CartItem
{
    public int Id { get; set; }
    public string UserId { get; set; } = "user-1"; // hardcoded until M5 auth
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public DateTime AddedDate { get; set; } = DateTime.UtcNow;

    // Navigation property to Product
    public Product? Product { get; set; }
}
