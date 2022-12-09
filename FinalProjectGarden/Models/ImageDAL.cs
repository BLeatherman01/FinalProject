using RestSharp;

namespace FinalProjectGarden.Models
{
    public class ImageDAL
    {
      
        public ImageSearch GetImageSearch(string searched)
        {
            var client = new RestClient($"https://pixabay.com/api/?key={Secret.key2}&q={searched}");
            var request = new RestRequest();
            var response = client.GetAsync<ImageSearch>(request);
            ImageSearch im = response.Result;
            return im;
        }

    }
}
