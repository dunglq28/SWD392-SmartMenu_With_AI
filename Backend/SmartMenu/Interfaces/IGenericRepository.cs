using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmartMenu.Interfaces
{
    public interface IGenericRepository<TEntity, TDto> where TEntity : class
    {
        Task<IEnumerable<TDto>> GetAllAsync();
        Task<TDto> GetAsync(int id);
        Task<TDto> AddAsync(TDto dto);
        Task<TDto> UpdateAsync(int id, TDto dto);
        Task<bool> DeleteAsync(int id);
        Task<int> SaveChangesAsync();
    }
}
