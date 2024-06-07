using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Product;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IProductService
    {
        Task<ProductDTO?> UpdateAsync(int id, UpdateProductDTO reqObj);
        Task<ProductDTO> Insert(AddProductDTO reqObj);
        Task<PageEntity<ProductDTO>?> GetAllAsync(string? searchKey, int brandID, int? categoryID, int? pageIndex, int? pageSize);
        Task<ProductDTO?> GetAsync(int id);
        Task<bool> Delete(int id);
    }
}
