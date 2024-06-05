using FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Amazon.S3.Util.S3EventNotification;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IAppUserService
    {
        Task<PageEntity<AppUserDTO>> Get(
            int currentIDLogin,
            string searchKye,
            int? pageIndex = null, // Optional parameter for pagination (page number)
            int? pageSize = null); // Optional parameter for pagination (number of records per page)

        Task<AppUserDTO?> GetByID(int id);

        Task<AppUserDTO> Insert(CreateAppUserDTO entity);

        Task<bool> Delete(int id);

        Task<AppUserDTO> Update(int id, UpdateAppUserDTO entityToUpdate);

        Task<int> Count();
        
    }
}
