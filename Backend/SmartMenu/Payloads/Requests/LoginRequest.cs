using System.ComponentModel.DataAnnotations;

namespace SmartMenu.Payloads.Requests
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Username is required")]
        public string UserName { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
