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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecentPlant>>> GetFav(string googleId)
        {
            int userId = (int)_context.Users.First(g => g.GoogleId == googleId).Id;
            int favGardenId = (int)_context.MyGardens.First(g => g.GardenId == userId).Id;
            return await _context.RecentPlants.Where(rp => rp.GardenId == favGardenId).ToArrayAsync();
        }



        // PUT: api/RecentPlants/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRecentPlant(int id, RecentPlant recentPlant, string gardenName)
        {
            if (id != recentPlant.Id)
            {
                return BadRequest();
            }
            recentPlant.GardenId = (int)_context.MyGardens.First(g => g.GardenName == gardenName).Id;

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

        [HttpGet("PlantsInGarden")]
        public async Task<ActionResult<IEnumerable<RecentPlant>>> GetAllPlanted(string googleId)
        {
            int userId = (int)_context.Users.First(g => g.GoogleId == googleId).Id;
            List<int> gardenId = new List<int>(); 
            List<MyGarden> gardenList = _context.MyGardens.Where(g => g.GardenId == userId).ToList(); 
            for(int i = 0; i < gardenList.Count; i++)
            {
                gardenId.Add((int)gardenList[i].Id);

            }
            
          List<RecentPlant>plantList = new List<RecentPlant>();
            foreach(int id in gardenId) 
            { 
                    plantList.AddRange(_context.RecentPlants.Where(p => p.GardenId == id));            
            }

            return plantList;

        }
        //[HttpGet("PlantedDetails")]
        //public async Task<ActionResult<IEnumerable<RecentPlant>>> GetPlantedDetails(string googleId, int gardenId)
        //{
        //    //this finds user by googleId
        //    int userId = (int)_context.Users.First(g => g.GoogleId == googleId).Id;

        //    List<int> gardenDetails = new List<int>();

        //    List<MyGarden> gardenList = _context.MyGardens.Where(g => g.Id == gardenId).ToList();
            
        //    for (int i = 0; i < gardenList.Count; i++)
        //    {
        //        gardenDetails.Add((int)gardenList[i].Id);

        //    }
        //    List<MyGarden>eachPlant = new List<MyGarden>();

        //    eachPlant = gardenDetails.Where(gd => gd.)
            
        //        List<RecentPlant> plantList = new List<RecentPlant>();
            
        //    foreach (int id in gardenDetails)
        //    {
        //        plantList.AddRange(_context.RecentPlants.Where(p => p.GardenId == id ));
        //    }

        //    return plantList ;

        //}

        // POST: api/RecentPlants/gardenId
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecentPlant>> PostRecentPlant(string googleId, string commonName, string img)
        {
            RecentPlant recentPlant = new RecentPlant();
            recentPlant.Id = null;
            recentPlant.PlantId = commonName;
            recentPlant.PlantImageUrl = img;
            int userId = (int)_context.Users.First(g => g.GoogleId == googleId).Id;
            //FINDING FAVORITE GARDEN BY USERID
            recentPlant.GardenId=(int)_context.MyGardens.First(g => g.GardenId== userId).Id;
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

        [HttpGet("GardenDetails/{GardenID}")]
        public async Task<ActionResult<IEnumerable<RecentPlant>>> GetGardenDetails(int gardenId)
        {
            return _context.RecentPlants.Where(plants => plants.GardenId == gardenId).ToList();
        }

    }
}
