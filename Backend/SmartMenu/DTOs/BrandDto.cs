﻿namespace SmartMenu.DTOs
{
    public class BrandDto
    {
        public int BrandId { get; set; }

        public string BrandCode { get; set; } = null!;

        public string BrandName { get; set; } = null!;

        public DateOnly CreateDate { get; set; }

        public int Status { get; set; }

        public string Image { get; set; } = null!;
    }
}
