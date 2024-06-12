using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Repository.Repositories
{
    public class ProductMenuRepository : GenericRepository<ProductMenu>, IProductMenuRepository
    {
        private readonly SmartMenuContext _context;

        public ProductMenuRepository(SmartMenuContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<ProductMenu>?> getAllProductInMenu(int menuID)
        {
            var productMenus = await _context.ProductMenus
                .Where(x => x.MenuId == menuID).ToListAsync();
            return productMenus;
        }
    }
}
