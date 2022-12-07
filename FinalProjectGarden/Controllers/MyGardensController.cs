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
    public class MyGardensController : ControllerBase
    {
        private readonly GreenGrassDbContext _context;

        public MyGardensController(GreenGrassDbContext context)
        {
            _context = context;
        }

        // GET: api/MyGardens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyGarden>>> GetMyGardens()
        {
            return await _context.MyGardens.ToListAsync();
        }

        // GET: api/MyGardens/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MyGarden>> GetMyGarden(int id)
        {
            var myGarden = await _context.MyGardens.FindAsync(id);

            if (myGarden == null)
            {
                return NotFound();
            }

            return myGarden;
        }

        // PUT: api/MyGardens/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMyGarden(int id, MyGarden myGarden)
        {
            if (id != myGarden.Id)
            {
                return BadRequest();
            }

            _context.Entry(myGarden).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MyGardenExists(id))
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

        // POST: api/MyGardens
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<MyGarden>> PostMyGarden(MyGarden myGarden)
        {
            _context.MyGardens.Add(myGarden);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMyGarden", new { id = myGarden.Id }, myGarden);
        }

        // DELETE: api/MyGardens/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMyGarden(int id)
        {
            var myGarden = await _context.MyGardens.FindAsync(id);
            if (myGarden == null)
            {
                return NotFound();
            }

            _context.MyGardens.Remove(myGarden);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MyGardenExists(int id)
        {
            return _context.MyGardens.Any(e => e.Id == id);
        }
    }
}
