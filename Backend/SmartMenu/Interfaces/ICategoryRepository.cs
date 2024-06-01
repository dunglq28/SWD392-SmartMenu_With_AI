using Microsoft.EntityFrameworkCore;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Payloads.Requests;

namespace SmartMenu.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<Category,CategoryDTo>
    {
        Task<CategoryDTo> AddAsync(AddCagetoryRequest reqObj);

        Task<CategoryDTo?> UpdateAsync(int id, string cagetoryName);

        Task<IEnumerable<CategoryDTo>?> GetAllAsync(string searchKey, int brandID);

        Task<CategoryDTo?> GetAsync(int id);

        Task<bool> Delete(int id);


    }
}
