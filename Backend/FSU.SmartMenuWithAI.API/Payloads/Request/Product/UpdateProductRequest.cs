using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Product
{
    public class UpdateProductRequest
    {
        [StringLength(100, ErrorMessage = "Product name must be less than 100 characters.")]
        public string? ProductName { get; set; }

        [DataType(DataType.Upload)]
        public IFormFile? SpotlightVideo { get; set; }

        [DataType(DataType.Upload)]
        public IFormFile? Image { get; set; }

        [StringLength(500, ErrorMessage = "Description must be less than 500 characters.")]
        public string? Description { get; set; }
    }
}
