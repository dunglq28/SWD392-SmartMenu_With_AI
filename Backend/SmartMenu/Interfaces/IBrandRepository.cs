using SmartMenu.DTOs;
using SmartMenu.Entities;

namespace SmartMenu.Interfaces
{
    public interface IBrandRepository : IGenericRepository<Brand, BrandDto>
    {
        Task<BrandDto> UpdateAsync(int id, string brandName, string url, string imgName);
    }
}
