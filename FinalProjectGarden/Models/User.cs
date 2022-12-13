using System;
using System.Collections.Generic;

namespace FinalProjectGarden.Models;

public partial class User
{
    public int? Id { get; set; }

    public string? UserName { get; set; }

    public string? GoogleId { get; set; }

[System.Text.Json.Serialization.JsonIgnore]
public virtual ICollection<MyGarden> MyGardens { get; } = new List<MyGarden>();
[System.Text.Json.Serialization.JsonIgnore]
public virtual ICollection<MyGardensss> MyGardenssses { get; } = new List<MyGardensss>();
[System.Text.Json.Serialization.JsonIgnore]
public virtual ICollection<RecentPlantse> RecentPlantses { get; } = new List<RecentPlantse>();
}
