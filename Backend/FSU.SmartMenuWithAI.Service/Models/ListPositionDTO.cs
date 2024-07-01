namespace FSU.SmartMenuWithAI.Service.Models
{
    public class ListPositionDTO
    {
        public int ListId { get; set; }

        public string ListCode { get; set; } = null!;

        public int? TotalProduct { get; set; }

        public DateOnly CreateDate { get; set; }

        public int BrandId { get; set; }
    }
}
