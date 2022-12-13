using System;
using System.Collections.Generic;

namespace FinalProjectGarden.Models;

public partial class MyGardensss
{
    public int? Id { get; set; }

    public string? GardenName { get; set; }

    public string? Description { get; set; }

    public DateTime? PlantDate { get; set; }

    public DateTime? PickBloom { get; set; }

    public int? WateringFreq { get; set; }

    public string? Season { get; set; }

    public int? GardenId { get; set; }

    public string? PlantId { get; set; }

    public string? PlantImageUrl { get; set; }

    public string? Notes { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual User? Garden { get; set; }
}
