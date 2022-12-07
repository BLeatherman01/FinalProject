using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FinalProjectGarden.Models;

namespace FinalProjectGarden.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecentPlantsController : ControllerBase
    {
        private readonly GreenGrassDbContext _context;

        public RecentPlantsController(GreenGrassDbContext context)
        {
            _context = context;
        }

        // GET: api/RecentPlants
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecentPlant>>> GetRecentPlants()
        {
            return await _context.RecentPlants.ToListAsync();
        }

        // GET: api/RecentPlants/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecentPlant>> GetRecentPlant(int id)
        {
            var recentPlant = await _context.RecentPlants.FindAsync(id);

            if (recentPlant == null)
            {
                return NotFound();
            }

            return recentPlant;
        }

        // PUT: api/RecentPlants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecentPlant(int id, RecentPlant recentPlant)
        {
            if (id != recentPlant.Id)
            {
                return BadRequest();
            }

            _context.Entry(recentPlant).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecentPlantExists(id))
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

        // POST: api/RecentPlants
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecentPlant>> PostRecentPlant(RecentPlant recentPlant)
        {
            _context.RecentPlants.Add(recentPlant);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecentPlant", new { id = recentPlant.Id }, recentPlant);
        }

        // DELETE: api/RecentPlants/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecentPlant(int id)
        {
            var recentPlant = await _context.RecentPlants.FindAsync(id);
            if (recentPlant == null)
            {
                return NotFound();
            }

            _context.RecentPlants.Remove(recentPlant);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecentPlantExists(int id)
        {
            return _context.RecentPlants.Any(e => e.Id == id);
        }
    }
}
