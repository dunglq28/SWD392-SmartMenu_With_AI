using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Category
{
    public class AddCagetoryRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string CategoryName { get; set; } = null!;
        [Required]
        public int BrandId { get; set; }
    }
}
