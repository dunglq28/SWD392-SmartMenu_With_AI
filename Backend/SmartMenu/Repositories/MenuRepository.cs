using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Common.Enums;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;
using SmartMenu.Payloads.Requests;

namespace SmartMenu.Repositories
{
    public class MenuRepository : GenericRepository<Menu, MenuDTo>, IMenuRepository
    {
        private readonly SmartMenuContext _context;

        private readonly IMapper _mapper;
        public MenuRepository(SmartMenuContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MenuDTo> AddAsync(AddMenuRequest reqObj)
        {
            var menu = new Menu();
            menu.MenuCode = Guid.NewGuid().ToString();
            menu.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            menu.IsActive = reqObj.IsActive;
            menu.BrandId = reqObj.BrandId;

            await _context.Menus.AddAsync(menu);
            await _context.SaveChangesAsync();

            return _mapper.Map<MenuDTo>(menu);
        }

        public async Task<IEnumerable<MenuDTo>?> GetAllByBrandIDAsync(int brandID)
        {

            var entities = await _context.Menus.Include(x => x.Brand)
                 .Where(x => x.BrandId == brandID)
                 .ToListAsync();
            return _mapper.Map<IEnumerable<MenuDTo>>(entities);
        }


        public async Task<MenuDTo?> UpdateAsync(int id, bool isActive)
        {
            var entity = await _context.Menus.FindAsync(id);
            if (entity == null)
            {
                return default(MenuDTo);
            }
            entity.IsActive = isActive;
            await _context.SaveChangesAsync();
            return _mapper.Map<MenuDTo>(entity);
        }
    }
}
