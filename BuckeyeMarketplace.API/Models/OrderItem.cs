namespace BuckeyeMarketplace.API.Models;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;

    // Nullable FK — deleting a product must not destroy order history
    public int? ProductId { get; set; }
    public Product? Product { get; set; }

    // Price snapshot at time of purchase
    public string ProductTitle { get; set; } = string.Empty;
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
}
