namespace SmartMenu.DTOs
{
    public class BrandDto
    {
        public int BrandId { get; set; }

        public string BrandCode { get; set; } = null!;

        public string BrandName { get; set; } = null!;

        public int UserId { get; set; }

        public DateOnly CreateDate { get; set; }

        public int Status { get; set; }

        public string? ImageUrl { get; set; }

        public string? ImageName { get; set; }
    }
}
