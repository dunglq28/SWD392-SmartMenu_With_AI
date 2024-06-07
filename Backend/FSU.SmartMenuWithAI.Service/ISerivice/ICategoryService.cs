using FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Category;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface ICategoryService
    {
        Task<CategoryDTO> Insert(AddCagetoryDTO reqObj);

        Task<CategoryDTO?> UpdateAsync(int id, string cagetoryName);

        Task<PageEntity<CategoryDTO>?> GetAllAsync(string? searchKey, int brandID, int? pageIndex, int? pageSize);

        Task<CategoryDTO?> GetAsync(int id);

        Task<bool> Delete(int id);
    }
}
