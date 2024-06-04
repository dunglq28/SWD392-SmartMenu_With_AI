using SmartMenu.DTOs;
using SmartMenu.Entities;

namespace SmartMenu.Interfaces
{
    public interface IGroupAttributeRepository : IGenericRepository<GroupAttribute, GroupAttributeDto>
    {
        Task<GroupAttributeDto> GetByNameAsync(string name);
        Task<GroupAttributeDto> AddAsync(string name);
    }
}
