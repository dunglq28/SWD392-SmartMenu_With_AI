using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Repository.Interfaces
{
    public interface ICategoryRepository
    {
        IEnumerable<Menu> Get(
           int brandID,
           Expression<Func<Menu, bool>> filter = null!,
           Func<IQueryable<Menu>, IOrderedQueryable<Menu>> orderBy = null!,
           string includeProperties = "",
           int? pageIndex = null, // Optional parameter for pagination (page number)
           int? pageSize = null); // Optional parameter for pagination (number of records per page)

    }
}
