using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Pagination;
using FSU.SmartMenuWithAI.Service.Utils;
using System.Linq.Expressions;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class MenuService :  IMenuService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public MenuService(IUnitOfWork context, IMapper mapper) 
        {
            _unitOfWork = context;
            _mapper = mapper;
        }

        public async Task<bool> Delete(int id)
        {
            var deleteMenu = await _unitOfWork.MenuRepository.GetByID(id);
            if (deleteMenu == null)
            {
                return false;
            }
            _unitOfWork.MenuRepository.Delete(id);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<PageEntity<MenuDTO>?> GetAllAsync( int brandID, int? pageIndex, int? pageSize)
        {
            Expression<Func<Menu, bool>> filter = brandID > 0 ? x => x.BrandId == brandID : null!;

            Func<IQueryable<Menu>, IOrderedQueryable<Menu>> orderBy = q => q.OrderByDescending(x => x.MenuId);
            string includeProperties = "Brand";

            var entities = await _unitOfWork.MenuRepository
                .Get(filter: filter, orderBy: orderBy, includeProperties: includeProperties, pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<MenuDTO>();
            pagin.List = _mapper.Map<IEnumerable<MenuDTO>>(entities).ToList();
            pagin.TotalRecord = await _unitOfWork.CategoryRepository.Count();
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }

        public async Task<MenuDTO?> GetAsync(int id)
        {
            var menu = await _unitOfWork.MenuRepository.GetByID(id);
            var mapDTO = _mapper.Map<MenuDTO>(menu);
            mapDTO.BrandName = menu.Brand.BrandName;
            return mapDTO;
        }

        public async Task<bool> Insert(MenuDTO reqObj)
        {
            var menu = new Menu();
            menu.MenuCode = Guid.NewGuid().ToString();
            menu.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            menu.IsActive = reqObj.IsActive!.Value;
            menu.BrandId = reqObj.BrandId!.Value;

            await _unitOfWork.MenuRepository.Insert(menu);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<bool> UpdateAsync(int id, bool isActive)
        {
            var menu = await _unitOfWork.MenuRepository.GetByID(id);
            if (menu == null)
            {
                return false;
            }
            menu.IsActive = isActive;
            _unitOfWork.MenuRepository.Update(menu);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }
    }
}
