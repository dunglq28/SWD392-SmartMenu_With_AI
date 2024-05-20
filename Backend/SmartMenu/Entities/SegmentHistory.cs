using System;
using System.Collections.Generic;

namespace SmartMenu.Entities;

public partial class SegmentHistory
{
    public int HistoryId { get; set; }

    public string ImageCustomer { get; set; } = null!;

    public DateOnly CreateDate { get; set; }

    public int MenuId { get; set; }

    public virtual Menu Menu { get; set; } = null!;
}
