using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.AppUser
{
    public class UpdateAppUserRequest
    {

        [Required]
        [StringLength(50, MinimumLength = 8)]
        [RegularExpression(@"^[a-zA-Z0-9]+$", ErrorMessage = "Chỉ được chứa chữ cái và số")]
        public string? Password { get; set; } = null!;

        [Required]
        public bool IsActive { get; set; }

        [StringLength(50, MinimumLength = 3)]
        public string? Fullname { get; set; }

        [Phone]
        public string? Phone { get; set; }

        public DateOnly? Dob { get; set; }

        [StringLength(10)]
        public string? Gender { get; set; }

        public int? UpdateBy { get; set; }

    }
}
