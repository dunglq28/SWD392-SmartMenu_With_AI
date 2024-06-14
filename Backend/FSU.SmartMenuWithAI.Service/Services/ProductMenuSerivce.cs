using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Pagination;
using FSU.SmartMenuWithAI.Service.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using static Amazon.S3.Util.S3EventNotification;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class ProductMenuSerivce : IProductMenuSerivce
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public ProductMenuSerivce(IUnitOfWork unitOfWork, IMapper mapper, IProductService productService)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _productService = productService;
        }

        public async Task<bool> Delete(int menuId, int productId)
        {
            Expression<Func<ProductMenu, bool>> filter = x => x.MenuId == menuId && x.ProductId == productId;
            var deleteProductMenu = await _unitOfWork.ProductMenuRepository.GetByCondition(filter);
            if (deleteProductMenu == null)
            {
                return false;
            }
            _unitOfWork.ProductMenuRepository.Delete(deleteProductMenu);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<PageEntity<ProductMenuDTO>> GetAllAsync(int menuID, string? searchKey, int? pageIndex = null, int? pageSize = null)
        {
            Expression<Func<ProductMenu, bool>> filter = searchKey != null
                 ? x => x.Product.ProductName.ToLower().Contains(searchKey.ToLower())
                 && x.MenuId == menuID : x => x.MenuId == menuID;
                 


            Func<IQueryable<ProductMenu>, IOrderedQueryable<ProductMenu>> orderBy = q => q.OrderByDescending(x => x.ProductId);
            string includeProperties = "Product,Menu";

            var entities = await _unitOfWork.ProductMenuRepository.Get(filter: filter, orderBy: orderBy, includeProperties: includeProperties, pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<ProductMenuDTO>();
            pagin.List = _mapper.Map<IEnumerable<ProductMenuDTO>>(entities).ToList();
            Expression<Func<ProductMenu, bool>> countProductInMenu = x => x.MenuId == menuID;
            pagin.TotalRecord = await _unitOfWork.ProductMenuRepository.Count(countProductInMenu);
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }

        public async Task<ProductMenuDTO?> GetByID(int menuId, int productID)
        {
            Expression<Func<ProductMenu, bool>> condition = x => x.ProductId == productID && x.MenuId == menuId;


            var entity = await _unitOfWork.ProductMenuRepository.GetByCondition(condition);
            if (entity == null)
            {
                return null!;
            }
            return _mapper?.Map<ProductMenuDTO?>(entity);
        }

        public async Task<List<ProductDTO>> getProductNotInMenu(int menuId, int brandID)
        {
            var productsInMenu = await _unitOfWork.ProductMenuRepository.getAllProductInMenu(menuId);
            var productInBrand = await _productService.GetAllProductInBrandAsync(brandID);
            if (productInBrand.IsNullOrEmpty())
            {
                return null!;
            }
            var ProductNotInMenu = productInBrand!.Where(product => productsInMenu!.Any(x => x.ProductId != product.ProductId)).ToList();
            return ProductNotInMenu;
        }

        public async Task<List<ProductMenuDTO>> Insert(int MenuId, List<CreateProductMenuDTO> dto)
        {
            var productMenus = _mapper.Map<List<ProductMenu>>(dto);
            foreach (var item in productMenus)
            {

                Expression<Func<ProductMenu, bool>> duplicateItem = x => x.ProductId.Equals(item.ProductId) && x.MenuId == item.MenuId;
                var exist = await _unitOfWork.ProductMenuRepository.GetByCondition(duplicateItem);
                if (exist != null)
                {
                    continue;
                }
                item.MenuId = MenuId;
                await _unitOfWork.ProductMenuRepository.Insert(item);
            }
            if (await _unitOfWork.SaveAsync() > 0)
            {
                return _mapper.Map<List<ProductMenuDTO>>(productMenus);
            }
            return null!;
        }

        public async Task<ProductMenuDTO?> Update(ProductMenuDTO entityToUpdate)
        {
            Expression<Func<ProductMenu, bool>> condition = x => x.ProductId == entityToUpdate.ProductId
            && x.MenuId == entityToUpdate.MenuId;
            var updateProductMenu = await _unitOfWork.ProductMenuRepository.GetByCondition(condition);
            if (updateProductMenu == null)
            {
                return null!;
            }

            if (entityToUpdate.Price != default)
            {
                updateProductMenu.Price = entityToUpdate.Price;
            }

            if (entityToUpdate.DisplayIndex != default)
            {
                updateProductMenu.DisplayIndex = entityToUpdate.DisplayIndex;
            }

            _unitOfWork.ProductMenuRepository.Update(updateProductMenu);
            var result = new ProductMenuDTO();
            if (await _unitOfWork.SaveAsync() > 0)
            {
                result = _mapper.Map<ProductMenuDTO>(updateProductMenu);
            }
            return result;
        }
    }
}
