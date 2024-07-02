using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.CustomerSegment;
using FSU.SmartMenuWithAI.Service.Models.MenuList;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.CustomerSegment
{
    public class AddCusSegmentRequest
    {
        
        [Required]
        [StringLength(500, MinimumLength = 5)]
        public string SegmentName { get; set; } = null!;
        [Required]
        public List<AddAttributeSegmentDTO> attributeDTOs { get; set; }
    }
}
