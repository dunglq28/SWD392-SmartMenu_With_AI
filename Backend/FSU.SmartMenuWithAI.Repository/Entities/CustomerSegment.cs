using System;
using System.Collections.Generic;

namespace FSU.SmartMenuWithAI.Repository.Entities;

public partial class CustomerSegment
{
    public int SegmentId { get; set; }

    public string SegmentCode { get; set; } = null!;

    public string SegmentName { get; set; } = null!;

    public DateOnly CreateDate { get; set; }

    public DateOnly? UpdateDate { get; set; }

    public int Status { get; set; }

    public virtual ICollection<MenuSegment> MenuSegments { get; set; } = new List<MenuSegment>();

    public virtual ICollection<SegmentAttribute> SegmentAttributes { get; set; } = new List<SegmentAttribute>();
}
