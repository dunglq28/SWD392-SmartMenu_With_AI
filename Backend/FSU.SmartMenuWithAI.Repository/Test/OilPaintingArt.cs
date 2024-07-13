using System;
using System.Collections.Generic;

namespace FSU.SmartMenuWithAI.Repository.Test;

public partial class OilPaintingArt
{
    public int OilPaintingArtId { get; set; }

    public string ArtTitle { get; set; } = null!;

    public string? OilPaintingArtLocation { get; set; }

    public string? OilPaintingArtStyle { get; set; }

    public string? Artist { get; set; }

    public string? NotablFeatures { get; set; }

    public decimal? PriceOfOilPaintingArt { get; set; }

    public int? StoreQuantity { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string? SupplierId { get; set; }

    public virtual SupplierCompany? Supplier { get; set; }
}
