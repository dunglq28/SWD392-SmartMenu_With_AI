using AutoMapper;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Service.Common.Enums;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using Microsoft.EntityFrameworkCore;
using static Amazon.S3.Util.S3EventNotification;
using FSU.SmartMenuWithAI.Service.Models.Pagination;
using FSU.SmartMenuWithAI.Service.Utils;
using System.Linq.Expressions;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class BrandService : IBrandService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BrandService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<BrandDTO> GetByID(int id)
        {
            var entity = await _unitOfWork.BrandRepository.GetByID(id);
            return _mapper?.Map<BrandDTO?>(entity)!;
        }
        public async Task<bool> Delete(int id)
        {
            var brandDelete = await _unitOfWork.BrandRepository.GetByID(id);
            if (brandDelete == null)
            {
                return false;
            }
            brandDelete.Status = (int)Status.Deleted;

            _unitOfWork.BrandRepository.Update(brandDelete);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<BrandDTO> GetByNameAsync(string brandName)
        {
            var entity = await _unitOfWork.BrandRepository.GetBrandByName(brandName);
            return _mapper?.Map<BrandDTO>(entity)!;
        }

        public async Task<BrandDTO> Insert(string brandName, int userID, string imgUrl, string imgName)
        {
                var brand = new Brand();
                brand.BrandCode = Guid.NewGuid().ToString();
                brand.BrandName = brandName;
                brand.UserId = userID;
                brand.CreateDate = DateOnly.FromDateTime(DateTime.Now);
                brand.Status = 1;
                brand.ImageName = imgName;
                brand.ImageUrl = imgUrl;

                await _unitOfWork.BrandRepository.Insert(brand);
                var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
                if (result) 
                {
                    return _mapper?.Map<BrandDTO>(brand)!;
                }
                return null!;
        }
        public async Task<BrandDTO> Update(int id, string brandName, string imgUrl, string imgName)
        {
            var brandToUpdate = await _unitOfWork.BrandRepository.GetByID(id);
            if (brandToUpdate == null)
            {
                return null!;
            }

            if (!string.IsNullOrEmpty(brandName))
            {
                brandToUpdate.BrandName = brandName;
            }

            if (!string.IsNullOrEmpty(imgUrl))
            {
                brandToUpdate.ImageUrl = imgUrl;
            }

            if (!string.IsNullOrEmpty(imgName))
            {
                brandToUpdate.ImageName = imgName;
            }

            _unitOfWork.BrandRepository.Update(brandToUpdate);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return _mapper?.Map<BrandDTO>(brandToUpdate)!;
        }
        public async Task<PageEntity<BrandDTO>> GetBrands(string? searchKey, int? pageIndex = null, int? pageSize = null)
        {

            Expression<Func<Brand, bool>> filter = x => string.IsNullOrEmpty(searchKey) || x.BrandName.Contains(searchKey);

            Func<IQueryable<Brand>, IOrderedQueryable<Brand>> orderBy = q => q.OrderBy(x => x.BrandId);

            var entities = _unitOfWork.BrandRepository.GetBrands(filter: filter, orderBy: orderBy, pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<BrandDTO>();
            pagin.List = _mapper.Map<IEnumerable<BrandDTO>>(entities).ToList();
            pagin.TotalRecord = await _unitOfWork.BrandRepository.Count();
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }
    }
}
