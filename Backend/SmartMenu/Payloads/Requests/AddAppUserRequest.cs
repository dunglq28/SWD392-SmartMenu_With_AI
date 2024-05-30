using System.ComponentModel.DataAnnotations;

namespace SmartMenu.Payloads.Requests
{
    public class AddAppUserRequest
    {
        public string UserName { get; set; } = null!;

        public string Password { get; set; } = null!;

        public int RoleId { get; set; }

        public bool IsActive { get; set; }

    }
}
