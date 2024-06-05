using System;
using System.Collections.Generic;

namespace FSU.SmartMenuWithAI.BussinessObject.Entitites;

public partial class Menu
{
    public int MenuId { get; set; }

    public string MenuCode { get; set; } = null!;

    public DateOnly CreateDate { get; set; }

    public bool IsActive { get; set; }

    public int BrandId { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual ICollection<MenuSegment> MenuSegments { get; set; } = new List<MenuSegment>();

    public virtual ICollection<ProductMenu> ProductMenus { get; set; } = new List<ProductMenu>();
}
