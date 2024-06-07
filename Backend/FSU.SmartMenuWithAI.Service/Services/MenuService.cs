using AutoMapper;
using FSU.SmartMenuWithAI.BussinessObject.Common.Enums;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Menu;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using FSU.SmartMenuWithAI.BussinessObject.Utils;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
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

            Func<IQueryable<Menu>, IOrderedQueryable<Menu>> orderBy = q => q.OrderBy(x => x.MenuId);
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

        public async Task<MenuDTO> Insert(AddMenuDTO reqObj)
        {
            var menu = new Menu();
            menu.MenuCode = Guid.NewGuid().ToString();
            menu.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            menu.IsActive = reqObj.IsActive;
            menu.BrandId = reqObj.BrandId;

            await _unitOfWork.MenuRepository.Insert(menu);
            if (await _unitOfWork.SaveAsync() < 1)
            {
                return null!;
            }
            var mapDTO = _mapper.Map<MenuDTO>(menu);
            return mapDTO;
        }

        public async Task<MenuDTO?> UpdateAsync(int id, bool isActive)
        {
            var menu = await _unitOfWork.MenuRepository.GetByID(id);
            if (menu == null)
            {
                return default(MenuDTO);
            }
            menu.IsActive = isActive;
            _unitOfWork.MenuRepository.Update(menu);
            await _unitOfWork.SaveAsync();
            var mapDTO = _mapper.Map<MenuDTO>(menu);
            return mapDTO;
        }
    }
}
