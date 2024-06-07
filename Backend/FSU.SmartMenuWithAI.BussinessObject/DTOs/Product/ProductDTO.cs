using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.BussinessObject.DTOs.Product
{
    public class ProductDTO
    {
        public int ProductId { get; set; }

        public string ProductCode { get; set; } = null!;

        public DateOnly CreateDate { get; set; }

        public string ProductName { get; set; } = null!;

        public string? SpotlightVideoImageUrl { get; set; }

        public string? SpotlightVideoImageName { get; set; }

        public string? ImageUrl { get; set; }

        public string? ImageName { get; set; }

        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public int BrandId { get; set; }
    }
    public class AddProductDTO
    {
        public string ProductName { get; set; } = null!;
        public IFormFile SpotlightVideo { get; set; } = null!;

        public IFormFile Image { get; set; } = null!;

        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public int BrandId { get; set; }
    }

    public class UpdateProductDTO
    {
        public string? ProductName { get; set; }
        public IFormFile SpotlightVideo { get; set; } = null!;
        public IFormFile Image { get; set; } = null!;
        public string? Description { get; set; }

    }

}
