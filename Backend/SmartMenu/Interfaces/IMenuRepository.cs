using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Payloads.Requests;

namespace SmartMenu.Interfaces
{
    public interface IMenuRepository : IGenericRepository<Menu,MenuDTo>
    {
        Task<MenuDTo> AddAsync(AddMenuRequest reqObj);

        Task<MenuDTo?> UpdateAsync(int id, bool isActive);
        Task<IEnumerable<MenuDTo>?> GetAllByBrandIDAsync( int brandID);

    }
}
