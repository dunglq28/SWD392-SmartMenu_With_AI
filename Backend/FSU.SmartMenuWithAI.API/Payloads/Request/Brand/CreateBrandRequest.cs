using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Brand
{
    
    public class CreateBrandRequest
    {
        [Required]
        [MaxLength(100)]
        public string BrandName { get; set; } = null!;

        [Required]
        public int UserId { get; set; }
        public IFormFile Image { get; set; } = null!;

    }
}
