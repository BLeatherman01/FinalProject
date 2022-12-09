using RestSharp;

namespace FinalProjectGarden.Models
{
    public class PlantsDAL
    {
       
        public SearchedPlant GetSearchedPlants(string searched)
        {
            var client = new RestClient($"https://api.floracodex.com/v1/plants?key={Secret.key}&q={searched}");
            var request = new RestRequest();
            var response = client.GetAsync<SearchedPlant>(request);
            SearchedPlant pl = response.Result;
            return pl;
        }


    }
}
