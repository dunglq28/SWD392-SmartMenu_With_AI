using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.BussinessObject.DTOs.Brand
{
    public class BrandDTO
    {
        public int BrandId { get; set; }

        public string BrandCode { get; set; } = null!;

        public string BrandName { get; set; } = null!;

        public int UserId { get; set; }

        public DateOnly CreateDate { get; set; }

        public int Status { get; set; }

        public string? ImageUrl { get; set; }

        public string? ImageName { get; set; }
    }

    public class CreateBrandDTO
    {
        public string BrandName { get; set; } = null!;
        public int UserId { get; set; }
        public IFormFile Image { get; set; } = null!;
    }

    public class UpdateBrandDTO
    {
        public string BrandName { get; set; } = null!;
        public IFormFile Image { get; set; } = null!;
    }
}
