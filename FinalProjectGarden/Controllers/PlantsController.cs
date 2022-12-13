using FinalProjectGarden.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinalProjectGarden.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantsController : ControllerBase
    {
        PlantsDAL api = new PlantsDAL();

        [HttpGet("{Searched}")]
        public SearchedPlant SearchedPlants(string Searched)
        {
            SearchedPlant sp = api.GetSearchedPlants(Searched);

            return sp;
        }


        // GET: api/<Plants>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<Plants>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Plants>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Plants>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Plants>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }



        [HttpGet("{id}")]
        public string GetPlantsByGardenName(string GardenName)
        {
            return "value";
        }
    }
}
