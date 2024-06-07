using AutoMapper;
using FSU.SmartMenuWithAI.BussinessObject.Common.Enums;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Category;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using FSU.SmartMenuWithAI.BussinessObject.Utils;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<CategoryDTO> Insert(AddCagetoryDTO reqObj)
        {
            var category = new Menu();
            category.CategoryCode = Guid.NewGuid().ToString();
            category.CategoryName = reqObj.CategoryName;
            category.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
            category.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            category.Status = (int)Status.Exist;
            category.BrandId = reqObj.BrandId;
            await _unitOfWork.CategoryRepository.Insert(category);
            if (await _unitOfWork.SaveAsync() < 1)
            {
                return null!;
            }
            var mapDTO = _mapper.Map<CategoryDTO>(category);
            return mapDTO;
        }

        public async Task<CategoryDTO?> UpdateAsync(int id, string cagetoryName)
        {
            var category = await _unitOfWork.CategoryRepository.GetByID(id);
            if (category == null)
            {
                return default(CategoryDTO);
            }
            category.CategoryName = cagetoryName;
            category.UpdateDate = DateOnly.FromDateTime(DateTime.Now);

            _unitOfWork.CategoryRepository.Update(category);
            await _unitOfWork.SaveAsync();
            var mapDTO = _mapper.Map<CategoryDTO>(category);
            mapDTO.BrandName = category.Brand.BrandName;
            return mapDTO;
        }

        public async Task<PageEntity<CategoryDTO>?> GetAllAsync(string? searchKey, int brandID, int? pageIndex , int? pageSize)
        {
            Expression<Func<Menu, bool>> filter = searchKey != null ? x => x.CategoryName.Contains(searchKey) && x.BrandId == brandID : x => x.BrandId == brandID;

            Func<IQueryable<Menu>, IOrderedQueryable<Menu>> orderBy = q => q.OrderBy(x => x.CategoryId);
            string includeProperties = "Brand";

            var entities = await _unitOfWork.CategoryRepository
                .Get(filter: filter, orderBy: orderBy, includeProperties: includeProperties, pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<CategoryDTO>();
            pagin.List = _mapper.Map<IEnumerable<CategoryDTO>>(entities).ToList();
            pagin.TotalRecord = await _unitOfWork.CategoryRepository.Count();
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }

        public async Task<CategoryDTO?> GetAsync(int id)
        {
            var category = await _unitOfWork.CategoryRepository.GetByID(id);
            var mapDTO = _mapper.Map<CategoryDTO>(category);
            mapDTO.BrandName = category.Brand.BrandName;
            return mapDTO;
        }

        public async Task<bool> Delete(int id)
        {
            var deleteCategory = await _unitOfWork.CategoryRepository.GetByID(id);
            if (deleteCategory == null)
            {
                return false;
            }
            deleteCategory.Status = (int)Status.Deleted;

            _unitOfWork.CategoryRepository.Update(deleteCategory);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

     
    }
}
