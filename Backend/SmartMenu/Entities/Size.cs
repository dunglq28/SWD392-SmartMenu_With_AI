using System;
using System.Collections.Generic;

namespace SmartMenu.Entities;

public partial class Size
{
    public int SizeId { get; set; }

    public string SizeName { get; set; } = null!;

    public string SizeAcronym { get; set; } = null!;

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
