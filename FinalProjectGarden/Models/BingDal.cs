using Microsoft.EntityFrameworkCore.Metadata.Internal;
using RestSharp;
using System.Net.Http.Headers;
using System.Net.Http;
using Microsoft.AspNetCore.Http.Headers;
using RestSharp.Authenticators;
using RestSharp.Authenticators.OAuth2;

namespace FinalProjectGarden.Models
{
    public class BingDal
    {
        Secret subscriptionKey;
        
        public BingImageSearch GetBingImageSearch(string searched)
        {
       
            var client = new RestClient($"curl https://api.bing.microsoft.com/v7.0/images/search?q={searched}");
            var request = new RestRequest();
            request.AddHeader("Ocp-Apim-Subscription-Key", subscriptionKey.ToString());
            var response = client.GetAsync<BingImageSearch>(request);
            BingImageSearch im = response.Result;
            return im;
        }
    }
}
