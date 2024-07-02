using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Menu
{
    public class RecomentMenuRequest
    {
        [Required]
        [JsonProperty("face-image")]
        public IFormFile faceImage { get; set; }
    }
}
