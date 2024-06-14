using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Attribute
{
    public class UpdateAttributeRequest
    {
        public string AttributeName { get; set; } = null!;
        public string? Description { get; set; }
        public int GroupAttributeId { get; set; }
    }
}
