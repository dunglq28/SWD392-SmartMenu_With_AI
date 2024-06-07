using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.Common.Enums;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Pagination;
using FSU.SmartMenuWithAI.Service.Utils;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Amazon.S3.Util.S3EventNotification;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class AppUserService : IAppUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AppUserService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<int> Count()
        {
           return await _unitOfWork.AppUserRepository.Count();
        }

        public async Task<bool> Delete(int id)
        {
            var deleteAppUser = await _unitOfWork.AppUserRepository.GetByID(id);
            if (deleteAppUser == null)
            {
                return false;
            }
            deleteAppUser.Status = (int)Status.Deleted;

            _unitOfWork.AppUserRepository.Update(deleteAppUser);
             var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<PageEntity<AppUserDTO>> Get(int currentIDLogin, string? searchKey, int? pageIndex = null, int? pageSize = null)
        {

            Expression<Func<AppUser, bool>> filter  = searchKey != null ? x => x.UserName.Contains(searchKey) && x.RoleId != (int)UserRole.Admin : null!;

            Func<IQueryable<AppUser>, IOrderedQueryable<AppUser>> orderBy = q => q.OrderBy(x => x.UserId);
            string includeProperties = "Role";

            var entities = _unitOfWork.AppUserRepository.Get( currentIDLogin, filter: filter, orderBy: orderBy, includeProperties: includeProperties ,pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<AppUserDTO>();
            pagin.List = _mapper.Map<IEnumerable<AppUserDTO>>(entities).ToList();
            pagin.TotalRecord = await _unitOfWork.AppUserRepository.Count();
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin ;
        }

        public async Task<AppUserDTO?> GetByID(int id)
        {
            var entity = await _unitOfWork.AppUserRepository.GetByID(id);
            return _mapper?.Map<AppUserDTO?>(entity);
        }

        public async Task<bool> Insert(AppUserDTO dto)
        {
            var user = _mapper.Map<AppUser>(dto);
            user.UserCode = Guid.NewGuid().ToString();
            user.Status = (int) Status.Exist;
            user.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            user.Password = dto.Password.IsNullOrEmpty() ? PasswordHelper.ConvertToEncrypt(dto.Password!) : PasswordHelper.ConvertToEncrypt("123456");

            await _unitOfWork.AppUserRepository.Insert(user);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<bool> Update(int id, AppUserDTO entityToUpdate)
        {
            var updateAppUser = await _unitOfWork.AppUserRepository.GetByID(id);
            if (updateAppUser == null)
            {
                return false;
            }

            if (!string.IsNullOrEmpty(entityToUpdate.Password))
            {
                updateAppUser.Password = PasswordHelper.ConvertToEncrypt(entityToUpdate.Password);
            }

            if (entityToUpdate.Status != default)
            {
                updateAppUser.Status = entityToUpdate.Status;
            }

            if (!string.IsNullOrEmpty(entityToUpdate.Fullname))
            {
                updateAppUser.Fullname = entityToUpdate.Fullname;
            }

            if (!string.IsNullOrEmpty(entityToUpdate.Phone))
            {
                updateAppUser.Phone = entityToUpdate.Phone;
            }

            if (entityToUpdate.Dob.HasValue)
            {
                updateAppUser.Dob = entityToUpdate.Dob.Value;
            }

            if (!string.IsNullOrEmpty(entityToUpdate.Gender))
            {
                updateAppUser.Gender = entityToUpdate.Gender;
            }

            if (entityToUpdate.UpdateBy != default)
            {
                updateAppUser.UpdateBy = entityToUpdate.UpdateBy;
            }

            updateAppUser.UpdateDate = DateOnly.FromDateTime(DateTime.Now);

            _unitOfWork.AppUserRepository.Update(updateAppUser);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }
    }
}
