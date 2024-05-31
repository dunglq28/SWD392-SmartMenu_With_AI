namespace SmartMenu.Payloads.Requests
{
    public class AddStoreRequest
    {
        public int UserId { get; set; }

        public string Address { get; set; } 

        public string City { get; set; } 

        public int BrandId { get; set; }
    }
}
