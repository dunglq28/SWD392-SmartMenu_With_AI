using Microsoft.EntityFrameworkCore;
using SmartMenu.DTOs;
using SmartMenu.Entities;

namespace SmartMenu.Interfaces
{
    public interface ICategoryRepository : IGenericRepository<Category,CategoryDTo>
    {
        Task<CategoryDTo> AddAsync(CategoryDTo reqObj);


        Task<CategoryDTo?> UpdateAsync(int id, CategoryDTo reqObj);
        Task<IEnumerable<CategoryDTo>?> GetAllAsync(string searchKey, int brandID);

        Task<CategoryDTo?> GetAsync(int id, int brandID); 
       
    }
}
