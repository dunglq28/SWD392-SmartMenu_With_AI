using FSU.SmartMenuWithAI.BussinessObject.DTOs.Category;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Store;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IStoreService
    {
        Task<PageEntity<StoreDTO>?> GetAllAsync(string? searchKey, int brandID, int? pageIndex, int? pageSize);

        Task<StoreDTO?> GetAsync(int id);

        Task<StoreDTO> Insert(AddStoreDTO entity);

        Task<bool> Delete(int id);

        Task<StoreDTO> UpdateAsync(int id, UpdateStoreDTO entityToUpdate);

    }
}
