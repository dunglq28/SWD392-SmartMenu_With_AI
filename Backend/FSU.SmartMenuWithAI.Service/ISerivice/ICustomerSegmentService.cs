using FSU.SmartMenuWithAI.Service.Models.MenuList;
using FSU.SmartMenuWithAI.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FSU.SmartMenuWithAI.Service.Models.Pagination;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface ICustomerSegmentService
    {
        Task<PageEntity<CustomerSegmentDTO>> GetAllAsync(
            string? searchKey
            , int? pageIndex
            , int? pageSize);

        Task<CustomerSegmentDTO?> GetByID(int SegmentId);

        Task<CustomerSegmentDTO> Insert(CustomerSegmentDTO newCusSegment ,List<SegmentAttributeDTO> listDto);

        Task<bool> Delete(int SegmentId);

        Task<CustomerSegmentDTO?> Update(int segmentId, string segmentName);
    }
}
