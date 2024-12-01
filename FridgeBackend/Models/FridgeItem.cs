namespace FridgeBackend.Models
{
    public class FridgeItem
    {
        public int Id { get; set; }

        
        public string Name { get; set; } =null!;
        public DateTime ExpiryDate { get; set; }
    }
}
