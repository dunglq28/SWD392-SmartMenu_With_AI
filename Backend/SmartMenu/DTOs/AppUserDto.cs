
namespace SmartMenu.DTOs
{
    public class AppUserDto
    {
        public int UserId { get; set; }

        public string UserCode { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public int RoleId { get; set; }
        public string RoleName { get; set; } = null!;

        public DateOnly CreateDate { get; set; }

        public bool IsActive { get; set; }

        public int Status { get; set; }
    }
}
