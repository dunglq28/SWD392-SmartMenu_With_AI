namespace SmartMenu.Payloads.Requests
{
    public class UpdateStoreRequest
    {
        public bool IsActive { get; set; }

        public string Address { get; set; } = null!;

        public string City { get; set; } = null!;
    }
}
