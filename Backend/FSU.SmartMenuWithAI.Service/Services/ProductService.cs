using AutoMapper;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Menu;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Product;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using FSU.SmartMenuWithAI.BussinessObject.Utils;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

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

            Func<IQueryable<Product>, IOrderedQueryable<Product>> orderBy = q => q.OrderBy(x => x.ProductId);

            var entities = await _unitOfWork.ProductRepository
                .Get(filter: filter, orderBy: orderBy, pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<ProductDTO>();
            pagin.List = _mapper.Map<IEnumerable<ProductDTO>>(entities).ToList();
            pagin.TotalRecord = await _unitOfWork.CategoryRepository.Count();
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }

        public async Task<ProductDTO?> GetAsync(int id)
        {
            var menu = await _unitOfWork.ProductRepository.GetByID(id);
            var mapDTO = _mapper.Map<ProductDTO>(menu);
            return mapDTO;
        }

        public async Task<ProductDTO> Insert(AddProductDTO reqObj)
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
                return null!;
            }
            var mapDTO = _mapper.Map<ProductDTO>(product);
            return mapDTO;
        }

        public async Task<ProductDTO?> UpdateAsync(int id, UpdateProductDTO reqObj)
        {
            var product = await _unitOfWork.ProductRepository.GetByID(id);
            if (product == null)
            {
                return default(ProductDTO);
            }
            product.ProductName = reqObj.ProductName;
            product.SpotlightVideoImageName = reqObj.SpotlightVideoImageName;
            product.SpotlightVideoImageUrl = reqObj.SpotlightVideoImageUrl;
            product.ImageUrl = reqObj.ImageUrl;
            product.ImageName = reqObj.ImageName;
            product.Description = reqObj.Description;

            _unitOfWork.ProductRepository.Update(product);
            await _unitOfWork.SaveAsync();
            var mapDTO = _mapper.Map<ProductDTO>(product);
            return mapDTO;
        }
    }
}
