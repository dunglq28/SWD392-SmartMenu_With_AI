namespace SmartMenu.DTOs
{
    public class CategoryDTo
    {
        public int CategoryId { get; set; }

        public string CategoryCode { get; set; } = null!;

        public string CategoryName { get; set; } = null!;

        public DateOnly CreateDate { get; set; }

        public DateOnly? UpdateDate { get; set; }

        public int Status { get; set; }

        public int BrandId { get; set; }

    }
}
