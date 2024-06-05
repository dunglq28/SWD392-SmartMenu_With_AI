using AutoMapper;
using FSU.SmartMenuWithAI.BussinessObject.Common.Constants;
using FSU.SmartMenuWithAI.BussinessObject.Common.Enums;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using FSU.SmartMenuWithAI.BussinessObject.Utils;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
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

            var entities = await _unitOfWork.AppUserRepository.Get( currentIDLogin, filter: filter, orderBy: orderBy, includeProperties: includeProperties ,pageIndex: pageIndex, pageSize: pageSize);
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

        public async Task<AppUserDTO> Insert(CreateAppUserDTO dto)
        {
            var user = new AppUser();
            user.UserCode = Guid.NewGuid().ToString();
            user.IsActive = dto.IsActive;
            user.Status = (int) Status.Exist;
            user.RoleId = dto.RoleId;
            user.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            user.UserName = dto.UserName;
            user.Password = dto.Password.IsNullOrEmpty() ? PasswordHelper.ConvertToEncrypt(dto.Password!) : PasswordHelper.ConvertToEncrypt("123456");
            await _unitOfWork.AppUserRepository.Insert(user);
            if(await _unitOfWork.SaveAsync() < 1)
            {
                return null!;
            }
            return _mapper.Map<AppUserDTO>(user);
        }

        public async Task<AppUserDTO> Update(int id, UpdateAppUserDTO entityToUpdate)
        {
            var updateAppUser = await _unitOfWork.AppUserRepository.GetByID(id);
            if (updateAppUser == null)
            {
                return null!;
            }
            updateAppUser.Password = PasswordHelper.ConvertToEncrypt(entityToUpdate.Password!);
            updateAppUser.IsActive = entityToUpdate.IsActive;
            updateAppUser.Status = entityToUpdate.Status;

            _unitOfWork.AppUserRepository.Update(updateAppUser);
            await _unitOfWork.SaveAsync();
            var mapDTO = _mapper.Map<AppUserDTO>(updateAppUser);
            return mapDTO;
        }
    }
}
