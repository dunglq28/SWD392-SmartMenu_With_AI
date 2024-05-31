namespace SmartMenu.Payloads.Requests.BrandRequest
{
    public class UpdateBrandRequest
    {
        public string BrandName { get; set; } = null!;
        public IFormFile? Image { get; set; }
        public string? ImageName { get; set; }
    }
}
