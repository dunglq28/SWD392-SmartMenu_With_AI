using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Pagination;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IProductService
    {
        Task<bool> UpdateAsync(int id, ProductDTO reqObj);
        Task<bool> Insert(ProductDTO reqObj);
        Task<PageEntity<ProductDTO>?> GetAllAsync(string? searchKey, int brandID, int? categoryID, int? pageIndex, int? pageSize);
        Task<ProductDTO?> GetAsync(int id);
        Task<bool> Delete(int id);
    }
}
