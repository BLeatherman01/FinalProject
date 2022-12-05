namespace FinalProjectGarden.Models
{

    public class SearchedPlant
    {
        public Datum[] data { get; set; }
        public string self { get; set; }
        public string first { get; set; }
        public string last { get; set; }
        public Meta meta { get; set; }
    }

    public class Meta
    {
        public int total { get; set; }
    }

    public class Datum
    {
        public string id { get; set; }
        public string author { get; set; }
        public string common_name { get; set; }
        public string slug { get; set; }
        public string scientific_name { get; set; }
        public string status { get; set; }
        public string rank { get; set; }
        public string family { get; set; }
        public string genus { get; set; }
        public string genus_id { get; set; }
        public string image_url { get; set; }
        public Links links { get; set; }
        public Meta1 meta { get; set; }
    }

    public class Links
    {
        public string self { get; set; }
        public string genus { get; set; }
        public string plant { get; set; }
    }

    public class Meta1
    {
        public DateTime last_modified { get; set; }
    }

}
