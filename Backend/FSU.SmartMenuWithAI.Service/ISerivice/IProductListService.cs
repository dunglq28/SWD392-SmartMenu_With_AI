using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IProductListService
    {
        Task<ProductListDTO> GetByID(int productId, int listId);
        Task<ProductListDTO> Insert(int productId, int listId, int price, int indexInList, int brandId);
        Task<ProductListDTO> UpdateAsync(int productId, int listId, int index, int price, int newProductId);
        Task<bool> DeleteAsync(int productId, int listId);

    }
}
