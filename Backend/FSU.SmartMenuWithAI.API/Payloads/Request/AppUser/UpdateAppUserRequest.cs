using System.ComponentModel.DataAnnotations;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.AppUser
{
    public class UpdateAppUserRequest
    {

        [Required]
        public bool IsActive { get; set; }

        [StringLength(50, MinimumLength = 3)]
        public string? Fullname { get; set; }

        [Phone]
        public string? Phone { get; set; }
        public DateOnly? Dob { get; set; }

        [StringLength(10)]
        public string? Gender { get; set; }
        [Required]
        public int? UpdateBy { get; set; }

    }
}
