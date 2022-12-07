using System;
using System.Collections.Generic;

namespace FinalProjectGarden.Models;

public partial class User
{
    public int Id { get; set; }

    public string? UserName { get; set; }

    public string? GoogleId { get; set; }

    public virtual ICollection<MyGarden> MyGardens { get; } = new List<MyGarden>();

    public virtual ICollection<RecentPlant> RecentPlants { get; } = new List<RecentPlant>();
}
