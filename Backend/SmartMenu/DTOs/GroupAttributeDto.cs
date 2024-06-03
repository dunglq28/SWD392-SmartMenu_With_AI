namespace SmartMenu.DTOs
{
    public class GroupAttributeDto
    {
        public int GroupAttributeId { get; set; }

        public string GroupAttributeName { get; set; } = null!;

        public DateOnly CreateDate { get; set; }
    }
}
