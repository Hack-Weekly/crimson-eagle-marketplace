using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Text.Json;

namespace server.Models;

public class ServerContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Fact> AboutFacts { get; set; }


    public ServerContext(DbContextOptions<ServerContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>()
            .Property(p => p.Images)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions)null),
                v => JsonSerializer.Deserialize<List<string>>(v, (JsonSerializerOptions)null),
                new ValueComparer<List<string>>(
                    (c1, c2) => c1.SequenceEqual(c2),
                    c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                    c => (List<string>)c.ToList())
            );
    }
}