using Microsoft.EntityFrameworkCore;
using SmartMenu.Common.Enums;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Payloads.Requests;

namespace SmartMenu.Interfaces
{
    public interface IStoreRepository : IGenericRepository<Store, StoreDTo>
    {
        Task<StoreDTo> AddAsync(AddStoreRequest reqObj);

        Task<StoreDTo?> UpdateAsync(int id, UpdateStoreRequest reqObj);

        Task<IEnumerable<StoreDTo>?> GetAllAsync(string searchKey, int brandID);

        Task<StoreDTo?> GetAsync(int id);

        Task<bool> Delete(int id);
       
    }
}
