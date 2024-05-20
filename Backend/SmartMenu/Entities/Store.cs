﻿using System;
using System.Collections.Generic;

namespace SmartMenu.Entities;

public partial class Store
{
    public int StoreId { get; set; }

    public string StoreCode { get; set; } = null!;

    public DateOnly CreateDate { get; set; }

    public bool IsActive { get; set; }

    public DateOnly UpdateDate { get; set; }

    public int Status { get; set; }

    public string Address { get; set; } = null!;

    public string City { get; set; } = null!;

    public int BrandId { get; set; }

    public virtual Brand Brand { get; set; } = null!;
}
