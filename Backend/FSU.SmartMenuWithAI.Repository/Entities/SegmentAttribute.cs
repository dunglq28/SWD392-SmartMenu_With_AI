using System;
using System.Collections.Generic;
using FSU.SmartMenuWithAI.Repository.Entities;

namespace FSU.SmartMenuWithAI.Repository.Entities;
public partial class SegmentAttribute
{
    public int SegmentId { get; set; }

    public int AttributeId { get; set; }

    public string Value { get; set; } = null!;

    public virtual Attribute Attribute { get; set; } = null!;

    public virtual CustomerSegment Segment { get; set; } = null!;
}
