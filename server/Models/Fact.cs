namespace server.Models
{
    public class Fact
    {
        public required string Id { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
        public string? Image { get; set; }
    }
}