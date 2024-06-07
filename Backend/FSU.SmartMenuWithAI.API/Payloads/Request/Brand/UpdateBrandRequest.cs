namespace FSU.SmartMenuWithAI.API.Payloads.Request.Brand
{
    public class UpdateBrandRequest
    {
        public string BrandName { get; set; } = null!;
        public IFormFile Image { get; set; } = null!;
    }
}
