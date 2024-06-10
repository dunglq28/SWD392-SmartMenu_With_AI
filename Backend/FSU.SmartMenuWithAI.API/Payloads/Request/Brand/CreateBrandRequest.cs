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
        [Required(ErrorMessage = "Nhập tên thương hiệu")]
        [MaxLength(100)]
        public string BrandName { get; set; } = null!;

        [Required(ErrorMessage = "Cần có id người dùng")]
        public string UserId { get; set; } = null!;
        public IFormFile Image { get; set; } = null!;

    }
}
