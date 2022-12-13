using System;
using System.Collections.Generic;

namespace FinalProjectGarden.Models;

public partial class RecentPlant
{
    public int? Id { get; set; }

    public DateTime? PlantDate { get; set; }

    public DateTime? PickBloom { get; set; }

    public int? WateringFreq { get; set; }

    public string? Season { get; set; }

    public string? PlantId { get; set; }

    public string? PlantImageUrl { get; set; }

    public int? GardenId { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual MyGarden? Garden { get; set; }
}
