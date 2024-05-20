using System;
using System.Collections.Generic;

namespace SmartMenu.Entities;

public partial class Product
{
    public int ProductId { get; set; }

    public string ProductCode { get; set; } = null!;

    public DateOnly CreateDate { get; set; }

    public string ProductName { get; set; } = null!;

    public string Price { get; set; } = null!;

    public string? Description { get; set; }

    public string? ImageUrl { get; set; }

    public string? SpotlightVideoImage { get; set; }

    public string? ImageName { get; set; }

    public int CategoryId { get; set; }

    public int BrandId { get; set; }

    public virtual Brand Brand { get; set; } = null!;

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<Menu> Menus { get; set; } = new List<Menu>();

    public virtual ICollection<Size> Sizes { get; set; } = new List<Size>();
}
