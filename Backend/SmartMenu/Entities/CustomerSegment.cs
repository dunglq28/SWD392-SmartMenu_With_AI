using System;
using System.Collections.Generic;

namespace SmartMenu.Entities;

public partial class CustomerSegment
{
    public int SegmentId { get; set; }

    public string SegmentCode { get; set; } = null!;

    public string SegmentName { get; set; } = null!;

    public DateOnly CreateDate { get; set; }

    public DateOnly? UpdateDate { get; set; }

    public int Status { get; set; }

    public int BrandId { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual ICollection<GroupAttribute> GroupAttributes { get; set; } = new List<GroupAttribute>();

    public virtual ICollection<Menu> Menus { get; set; } = new List<Menu>();
}
