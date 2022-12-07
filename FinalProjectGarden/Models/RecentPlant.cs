using System;
using System.Collections.Generic;

namespace FinalProjectGarden.Models;

public partial class RecentPlant
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public string? RecentPlants { get; set; }

    public int? RecentIds { get; set; }

    public virtual User? RecentIdsNavigation { get; set; }
}
