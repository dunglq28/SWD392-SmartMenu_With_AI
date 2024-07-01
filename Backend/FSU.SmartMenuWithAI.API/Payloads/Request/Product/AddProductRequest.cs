using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Product
{
    
    public class AddProductRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        [JsonProperty("product-name")]
        public string ProductName { get; set; } = null!;
        [JsonProperty("sportlight-video")]
        public IFormFile? SpotlightVideo { get; set; } = null!;

        [JsonProperty("image")]
        public IFormFile Image { get; set; } = null!;

        [Required]
        [StringLength(300, MinimumLength = 5)]
        [JsonProperty("description")]
        public string? Description { get; set; }

        [Required]
        [JsonProperty("price")]
        [Range(1, int.MaxValue, ErrorMessage = "giá không hợp lệ")]
        public decimal Price { get; set; }

        [Required]
        [JsonProperty("category-id")]
        public int CategoryId { get; set; }
        [Required]
        [JsonProperty("brand-id")]
        public int BrandId { get; set; }

    }

}
