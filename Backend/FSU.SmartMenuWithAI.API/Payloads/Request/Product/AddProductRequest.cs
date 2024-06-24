using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Product
{
    
    public class AddProductRequest
    {
        public string ProductName { get; set; } = null!;

        public IFormFile SpotlightVideo { get; set; } = null!;

        public IFormFile Image { get; set; } = null!;

        public string? Description { get; set; }

        public int CategoryId { get; set; }

        public int BrandId { get; set; }

    }

}
