using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.GroupAttribute
{
    public class CreateGroupAttributeRequest
    {
        [Required(ErrorMessage = "Nhập tên nhóm thuộc tính")]
        [MaxLength(100)]
        public string GroupAttributeName { get; set; } = null!;
    }
}
