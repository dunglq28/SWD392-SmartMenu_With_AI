using SmartMenu.DTOs;
using SmartMenu.Entities;

namespace SmartMenu.Interfaces
{
    public interface IBrandRepository : IGenericRepository<Brand, BrandDto>
    {
        Task<BrandDto> AddAsync(string brandName, int userID, string imgUrl, string imgName);
        Task<BrandDto> UpdateAsync(int id, string brandName, string url, string imgName, int status);
        Task<BrandDto> GetByIdAsync(int id);
    }
}
