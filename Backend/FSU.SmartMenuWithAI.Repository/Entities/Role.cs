﻿using System;
using System.Collections.Generic;
using FSU.SmartMenuWithAI.Repository.Entities;

namespace FSU.SmartMenuWithAI.Repository.Entities;

public partial class Role
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public virtual ICollection<AppUser> AppUsers { get; set; } = new List<AppUser>();
}