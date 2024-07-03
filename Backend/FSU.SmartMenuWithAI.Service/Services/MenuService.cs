using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Pagination;
using FSU.SmartMenuWithAI.Service.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.Linq.Expressions;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class MenuService : IMenuService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly IS3Service _s3Service;
        private readonly ISegmentAttributeService _segmentAttributeService;
        public MenuService(IUnitOfWork context, IMapper mapper, IS3Service s3Service, ISegmentAttributeService segmentAttributeService)
        {
            _unitOfWork = context;
            _mapper = mapper;
            _s3Service = s3Service;
            _segmentAttributeService = segmentAttributeService;
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

        public async Task<PageEntity<MenuDTO>?> GetAllAsync(int brandID, int? pageIndex, int? pageSize)
        {
            Expression<Func<Menu, bool>> filter = brandID > 0 ? x => x.BrandId == brandID : null!;

            Func<IQueryable<Menu>, IOrderedQueryable<Menu>> orderBy = q => q.OrderByDescending(x => x.MenuId);
            string includeProperties = "Brand";

            var entities = await _unitOfWork.MenuRepository
                .Get(filter: filter, orderBy: orderBy, includeProperties: includeProperties, pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<MenuDTO>();
            pagin.List = _mapper.Map<IEnumerable<MenuDTO>>(entities).ToList();
            Expression<Func<Menu, bool>> countMenuInBrand = x => x.BrandId == brandID;
            pagin.TotalRecord = await _unitOfWork.MenuRepository.Count(countMenuInBrand);
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

        public async Task<MenuDTO> RecomendMenu(IFormFile fileImage, int brandId)
        {
            // lay duoc hinh anh phan tich ra attribute
            var customerAtt = await _s3Service.AnalyzeFacesInImage(fileImage);
            // tim customer segment
            var customerSegment = await _segmentAttributeService.GetCusSegmentAsync(customerAtt);

            // tim menu cos priority cao nhat trong bang MenuSegment
            Func<IQueryable<MenuSegment>, IOrderedQueryable<MenuSegment>> orderBy = q => q.OrderByDescending(x => x.Priority);
            string includeProperties = "Segment,Menu";
            var menuSegments = await _unitOfWork.MenuSegmentRepository.GetAllNoPaging(x => x.SegmentId == customerSegment.SegmentId && x.Menu.BrandId == brandId, orderBy: orderBy, includeProperties);
            // tim menu theo id da lay duoc
            if (!menuSegments.IsNullOrEmpty())
            {
                var menuSegment = menuSegments.FirstOrDefault();
                var menuRecomend = await _unitOfWork.MenuRepository.GetByID(menuSegment!.MenuId);
                var mapdto1 = _mapper.Map<MenuDTO>(menuRecomend);
                return mapdto1;
            }
            var menuDefault = await _unitOfWork.MenuRepository.GetAllNoPaging(x=> x.BrandId == brandId, x => x.OrderByDescending(x => x.MenuId), includeProperties: includeProperties);
            var mapdto2 = _mapper.Map<MenuDTO>(menuDefault);
            return mapdto2;
        }
    }
}
