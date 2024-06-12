using FSU.SmartMenuWithAI.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Repository.Interfaces
{
    public interface IProductMenuRepository
    {
        Task<List<ProductMenu>?> getAllProductInMenu(int menuID);
    }
}
