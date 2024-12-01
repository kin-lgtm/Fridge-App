using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FridgeBackend.Data;
using FridgeBackend.Models;

namespace FridgeBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FridgeItemsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FridgeItemsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/FridgeItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FridgeItem>>> GetFridgeItems() =>
            await _context.FridgeItems.ToListAsync();

        // GET: api/FridgeItems/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FridgeItem>> GetFridgeItem(int id)
        {
            var item = await _context.FridgeItems.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // POST: api/FridgeItems
        [HttpPost]
        public async Task<ActionResult<FridgeItem>> PostFridgeItem(FridgeItem item)
        {
            // Check for duplicates (optional validation)
            if (_context.FridgeItems.Any(i => i.Name == item.Name))
            {
                return Conflict(new { message = "Item already exists in the fridge." });
            }

            _context.FridgeItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetFridgeItem), new { id = item.Id }, item);
        }

        // PUT: api/FridgeItems/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFridgeItem(int id, FridgeItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            var existingItem = await _context.FridgeItems.FindAsync(id);
            if (existingItem == null)
            {
                return NotFound();
            }

            existingItem.Name = item.Name;
            existingItem.ExpiryDate = item.ExpiryDate;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FridgeItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/FridgeItems/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFridgeItem(int id)
        {
            var item = await _context.FridgeItems.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            _context.FridgeItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper Method to Check if Item Exists
        private bool FridgeItemExists(int id) =>
            _context.FridgeItems.Any(e => e.Id == id);
    }
}