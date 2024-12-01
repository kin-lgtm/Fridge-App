using Microsoft.EntityFrameworkCore;
using FridgeBackend.Models;

namespace FridgeBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public required DbSet<FridgeItem> FridgeItems { get; set; } =null!;
    }
}
