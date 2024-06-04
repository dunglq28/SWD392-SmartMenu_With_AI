namespace SmartMenu.DTOs
{
    public class MenuDTo
    {
        public int? MenuId { get; set; }

        public string? MenuCode { get; set; } = null!;

        public DateOnly? CreateDate { get; set; }

        public bool? IsActive { get; set; }

        public int? BrandId { get; set; }

        public string? BrandName { get; set; }

    }
}
