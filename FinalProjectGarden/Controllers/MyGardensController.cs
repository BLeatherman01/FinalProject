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
        //Gets ALL Gardens
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MyGarden>>> GetMyGardens()
        {
            return await _context.MyGardens.ToListAsync();
        }

        // GET: api/MyGardens/5
        //Gets Gardens by specific GardenID
        [HttpGet("{googleId}")]
        public async Task<ActionResult<IEnumerable<MyGarden>>> GetMyGarden(string googleId)
        {
            int id = (int)_context.Users.First(u => u.GoogleId == googleId).Id;
            return await _context.MyGardens.Where(garden => garden.GardenId == id).ToArrayAsync();
                        
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
        public async Task<ActionResult<MyGarden>> PostMyGarden(string googleId, string gardenName)
        {
            MyGarden myGarden = new MyGarden();
            myGarden.Id = null;
            myGarden.GardenName = gardenName;
            myGarden.GardenId = (int)_context.Users.First(u => u.GoogleId == googleId).Id;
       
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

        [HttpGet("GardenDetails/{GardenName}")]
        public async Task<ActionResult<MyGarden>> GetGardenDetails(string GardenName)
        {
            return _context.MyGardens.Where(garden => garden.GardenName == GardenName).First();
        }




    }
}
