using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Pagination;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IListPositionService
    {
        Task<ListPositionDTO> GetByID(int id);
        Task<PageEntity<ListPositionDTO>> GetListPositionByBrandID(
           int searchKey,
           int? pageIndex = null,
           int? pageSize = null);
        Task<ListPositionDTO> Insert(int totalProduct, int brandID);
        Task<ListPositionDTO> UpdateAsync(int id, int totalProduct);
        Task<bool> DeleteAsync(int id);

    }
}
