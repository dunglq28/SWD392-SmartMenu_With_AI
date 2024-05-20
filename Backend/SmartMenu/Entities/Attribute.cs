using System;
using System.Collections.Generic;

namespace SmartMenu.Entities;

public partial class Attribute
{
    public int AttributeId { get; set; }

    public string AttributeCode { get; set; } = null!;

    public string AttributeName { get; set; } = null!;

    public DateOnly CreateDate { get; set; }

    public virtual ICollection<GroupAttribute> GroupAttributes { get; set; } = new List<GroupAttribute>();
}
