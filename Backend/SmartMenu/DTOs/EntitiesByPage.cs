namespace SmartMenu.DTOs
{
    public class EntitiesByPage<T>
    {
        public IEnumerable<T> List { get; set; } = new List<T>();

        public int TotalPage { get; set; }

        public int TotalRecord { get; set; }

    }
}
