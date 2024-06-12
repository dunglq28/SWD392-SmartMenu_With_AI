using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Menu
{
    public class UpdateProductMenuRequest
    {
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Price must be a positive integer.")]
        [JsonProperty("price")]
        public int Price { get; set; }
        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Product ID must be a positive integer.")]
        [JsonProperty("product-id")]
        public int ProductId { get; set; }
        [JsonProperty("menu-id")]
        [Required]
        public int MenuId { get; set; }

        [JsonProperty("display-index")]
        public int? DisplayIndex { get; set; }
    }
}
