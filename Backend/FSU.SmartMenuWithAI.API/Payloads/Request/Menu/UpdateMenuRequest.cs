using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Menu
{
    public class UpdateMenuRequest
    {
        [Required]
        [JsonProperty("is-avtive")]
        public bool isActive{ get; set; }

        [Required]
        [JsonProperty("menu-image")]
        public IFormFile? MenuImage { get; set; }
    }
}
