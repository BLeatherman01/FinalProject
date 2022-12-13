using System;
using System.Collections.Generic;

namespace FinalProjectGarden.Models;

public partial class RecentPlantse
{
    public int? Id { get; set; }

    public string? UserName { get; set; }

    public string? RecentPlants { get; set; }

    public int? RecentIds { get; set; }
    [System.Text.Json.Serialization.JsonIgnore]
    public virtual User? RecentIdsNavigation { get; set; }
}
