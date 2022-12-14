using RestSharp;

namespace FinalProjectGarden.Models
{
    public class BingDal
    {

        public BingImageSearch GetBingImageSearch(string searched)
        {

            var client = new RestClient($"https://api.bing.microsoft.com/v7.0/images/search?q={searched}");
            var request = new RestRequest();
            request.AddHeader("Ocp-Apim-Subscription-Key", Secret.subscriptionKey);
            var response = client.GetAsync<BingImageSearch>(request);
            

            try
            {   BingImageSearch im = response.Result;
                return im;
            }

            catch (Exception e)
            {
                if (e.Message.Contains("Unanthorized"))
                {
                    System.Threading.Thread.Sleep(5 * 1000);
                    BingImageSearch im = response.Result;
                    return im;
                }
                else
                {
                    throw new Exception(e.Message);
                }
            }
        }
    }
}
