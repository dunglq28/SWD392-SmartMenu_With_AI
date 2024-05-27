using SmartMenu.DTOs;

namespace SmartMenu.Utils
{
    public class PaginationHelper
    {
        public static EntitiesByPage<T> PaginationAsync<T>(int pageNumber, IEnumerable<T> list, int pageSize)
        {
            /*
            each page site have ... elements
            get the total of page count
            */
            var pageCount = (int)Math.Ceiling(list.Count() / (double)pageSize);

            // set the page number is 1 if it higher than number page or under 0

            if (pageNumber > pageCount || pageNumber < 0) pageNumber = 1;


            var result = new EntitiesByPage<T>()
            {
                List = list.Skip((pageNumber - 1) * pageSize).Take(pageSize),
                TotalPage = pageCount,
                TotalRecord = list.Count(),
            };
            return result;
        }
    }
}
