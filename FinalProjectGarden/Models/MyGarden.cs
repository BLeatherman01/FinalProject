using System;
using System.Collections.Generic;

namespace FinalProjectGarden.Models;

public partial class MyGarden
{
    public int? Id { get; set; }

    public string GardenName { get; set; } = null!;

    public string? Description { get; set; }

    public int? GardenId { get; set; }

    public string? Notes { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual User? Garden { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual ICollection<RecentPlant> RecentPlants { get; } = new List<RecentPlant>();
}
