﻿using System;
using System.Collections.Generic;

namespace FSU.SmartMenuWithAI.BussinessObject.Entitites;

public partial class Role
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public virtual ICollection<AppUser> AppUsers { get; set; } = new List<AppUser>();
}