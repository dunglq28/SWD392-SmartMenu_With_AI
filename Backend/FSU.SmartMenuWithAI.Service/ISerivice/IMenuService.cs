using FSU.SmartMenuWithAI.BussinessObject.DTOs.Category;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Menu;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IMenuService
    {

        Task<MenuDTO?> UpdateAsync(int id, bool isActive);
        Task<MenuDTO> Insert(AddMenuDTO reqObj);
        Task<PageEntity<MenuDTO>?> GetAllAsync( int brandID, int? pageIndex, int? pageSize);
        Task<MenuDTO?> GetAsync(int id);
        Task<bool> Delete(int id);

    }
}
