using System;
using System.Collections.Generic;

namespace SmartMenu.Entities;

public partial class Menu
{
    public int MenuId { get; set; }

    public string MenuCode { get; set; } = null!;

    public DateOnly CreateDate { get; set; }

    public bool IsActive { get; set; }

    public int Priority { get; set; }

    public int BrandId { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual ICollection<SegmentHistory> SegmentHistories { get; set; } = new List<SegmentHistory>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual ICollection<CustomerSegment> Segments { get; set; } = new List<CustomerSegment>();
}
