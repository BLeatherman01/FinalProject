using FinalProjectGarden.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FinalProjectGarden.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BingImageController : ControllerBase
    {
        BingDal api = new BingDal();

        
        [HttpGet]
        public BingImageSearch SearchBingImages(string Searched, int iteration)
        {
            Thread.Sleep((1000 * iteration));
            BingImageSearch bi = api.GetBingImageSearch(Searched);
            
            return bi;
        }

       
    }
}
