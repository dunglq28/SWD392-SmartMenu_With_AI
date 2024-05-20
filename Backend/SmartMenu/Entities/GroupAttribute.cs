using System;
using System.Collections.Generic;

namespace SmartMenu.Entities;

public partial class GroupAttribute
{
    public int GroupAttributeId { get; set; }

    public string GroupAttributeCode { get; set; } = null!;

    public string? Description { get; set; }

    public int Status { get; set; }

    public DateOnly CreateDate { get; set; }

    public int AttributeId { get; set; }

    public virtual Attribute Attribute { get; set; } = null!;

    public virtual ICollection<CustomerSegment> Segments { get; set; } = new List<CustomerSegment>();
}
