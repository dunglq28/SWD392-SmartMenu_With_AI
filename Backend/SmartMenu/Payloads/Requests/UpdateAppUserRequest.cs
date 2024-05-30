namespace SmartMenu.Payloads.Requests
{
    public class UpdateAppUserRequest
    {
        public int UserId { get; set; }
        public string Password { get; set; } = null!;

        public int RoleId { get; set; } = 0;

        public bool IsActive { get; set; }
        public int Status { get; set; }
    }
}
