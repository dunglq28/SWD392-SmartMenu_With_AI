namespace SmartMenu.Payloads.Requests.BrandRequest
{
    public class AddBrandRequest
    {
        public string BrandName { get; set; } = null!;

        public int UserId { get; set; }

        public IFormFile image { get; set; }
    }
}
