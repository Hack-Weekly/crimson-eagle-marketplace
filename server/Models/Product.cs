namespace server.Models;

public class Product
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public decimal Price { get; set; }
    public ushort DiscountPercentage { get; set; }
    public ushort Stock { get; set; }
    public string? Brand { get; set; }
    public ushort CategoryId { get; set; }
    public string? Thumbnail { get; set; }
    public List<string> Images { get; set; } = new List<string>();

    //public List<Product> Products { get; } = new();
}