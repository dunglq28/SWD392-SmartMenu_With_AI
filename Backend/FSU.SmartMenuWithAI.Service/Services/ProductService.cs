﻿using Amazon.Auth.AccessControlPolicy;
using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Common.Enums;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Pagination;
using FSU.SmartMenuWithAI.Service.Utils;
using System.Linq.Expressions;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class ProductService : IProductService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProductService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<bool> Delete(int id)
        {
            var deleteMenu = await _unitOfWork.ProductRepository.GetByID(id);
            if (deleteMenu == null)
            {
                return false;
            }
            _unitOfWork.ProductRepository.Delete(id);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<PageEntity<ProductDTO>?> GetAllAsync(string? searchKey, int brandID, int? categoryID, int? pageIndex, int? pageSize)
        {
            Expression<Func<Product, bool>> filter = searchKey != null ? x =>
                 
                x.BrandId == brandID 
                && x.CategoryId == categoryID 
                && x.ProductName.ToLower().Contains(searchKey.ToLower()) : null!;
            Func<IQueryable<Product>, IOrderedQueryable<Product>> orderBy = q => q.OrderByDescending(x => x.ProductId);
            string includeProperties = "Category";

            var entities = await _unitOfWork.ProductRepository
                .Get(filter: filter, orderBy: orderBy,includeProperties: includeProperties ,pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<ProductDTO>();
            pagin.List = _mapper.Map<IEnumerable<ProductDTO>>(entities).ToList();
            Expression<Func<Product, bool>> getProductInBrand = x => x.BrandId == brandID;
            pagin.TotalRecord = await _unitOfWork.ProductRepository.Count(getProductInBrand);
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }

        public async Task<List<ProductDTO>?> GetAllProductInBrandAsync(int brandId)
        {
            Expression<Func<Product, bool>> condition = x => x.BrandId == brandId;
            string includeProperties = "Category";

            var productInBrand = await _unitOfWork.ProductRepository.GetAllNoPaging(filter: condition, includeProperties: includeProperties);
            var dtos = _mapper.Map<List<ProductDTO>>(productInBrand.ToList());
            return dtos;
        }

        public async Task<ProductDTO?> GetAsync(int id)
        {
            var product = await _unitOfWork.ProductRepository.GetByID(id);
            var mapDTO = _mapper.Map<ProductDTO>(product);
            return mapDTO;
        }

        public async Task<bool> Insert(ProductDTO reqObj)
        {
            var product = new Product();
            product.ProductCode = Guid.NewGuid().ToString();
            product.ProductName = reqObj.ProductName;
            product.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            product.Description = reqObj.Description;
            product.ImageName = reqObj.ImageName;
            product.ImageUrl = reqObj.ImageUrl;
            product.SpotlightVideoImageName = reqObj.SpotlightVideoImageName;
            product.SpotlightVideoImageUrl = reqObj.SpotlightVideoImageUrl;
            product.CategoryId = reqObj.CategoryId;
            product.BrandId = reqObj.BrandId;

            await _unitOfWork.ProductRepository.Insert(product);
            if (await _unitOfWork.SaveAsync() < 1)
            {
                return false!;
            }
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<bool> UpdateAsync(int id, ProductDTO reqObj)
        {
            Expression<Func<Product, bool>> condition = x => x.ProductName.ToLower().Equals(reqObj.ProductName.ToLower());
            var existName = _unitOfWork.ProductRepository.GetByCondition(condition);
            if (existName != null)
            {
                throw new Exception("Tên đã tồn tại");
            }
            var product = await _unitOfWork.ProductRepository.GetByID(id);
            if (product == null)
            {
                return false;
            }

            if (!string.IsNullOrEmpty(reqObj.ProductName))
            {
                product.ProductName = reqObj.ProductName;
            }

            if (!string.IsNullOrEmpty(reqObj.SpotlightVideoImageName))
            {
                product.SpotlightVideoImageName = reqObj.SpotlightVideoImageName;
            }

            if (!string.IsNullOrEmpty(reqObj.SpotlightVideoImageUrl))
            {
                product.SpotlightVideoImageUrl = reqObj.SpotlightVideoImageUrl;
            }

            if (!string.IsNullOrEmpty(reqObj.ImageUrl))
            {
                product.ImageUrl = reqObj.ImageUrl;
            }

            if (!string.IsNullOrEmpty(reqObj.ImageName))
            {
                product.ImageName = reqObj.ImageName;
            }

            if (!string.IsNullOrEmpty(reqObj.Description))
            {
                product.Description = reqObj.Description;
            }

            _unitOfWork.ProductRepository.Update(product);
            var result = await _unitOfWork.SaveAsync() > 0;
            return result;
        }
    }
}
