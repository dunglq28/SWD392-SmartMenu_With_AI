using Amazon.Rekognition.Model;
using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.Common.Enums;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Pagination;
using FSU.SmartMenuWithAI.Service.Utils;
using System.Linq.Expressions;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class ListPositionService : IListPositionService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ListPositionService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<ListPositionDTO> GetByID(int id)
        {
            Expression<Func<ListPosition, bool>> condition = x => x.ListId == id;
            var entity = await _unitOfWork.ListPositionRepository.GetByCondition(condition);
            return _mapper?.Map<ListPositionDTO?>(entity)!;
        }

        public async Task<PageEntity<ListPositionDTO>> GetListPositionByBrandID(int searchKey, int? pageIndex = null, int? pageSize = null)
        {

            Expression<Func<ListPosition, bool>> filter = x => x.BrandId == searchKey;

            var entities = await _unitOfWork.ListPositionRepository.Get(filter: filter, pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<ListPositionDTO>();
            pagin.List = _mapper.Map<IEnumerable<ListPositionDTO>>(entities).ToList();
            pagin.TotalRecord = await _unitOfWork.ListPositionRepository.Count(filter);
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }
        public async Task<ListPositionDTO> UpdateAsync(int id, int totalProduct)
        {
            var listPosition = await _unitOfWork.ListPositionRepository.GetByID(id);
            if (listPosition == null)
                return null!;

            listPosition.TotalProduct = totalProduct;
            _unitOfWork.ListPositionRepository.Update(listPosition);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return _mapper.Map<ListPositionDTO>(listPosition);
        }
        public async Task<ListPositionDTO> Insert(int totalProduct, int brandId)
        {
            var listPosition = new ListPosition();
            listPosition.ListCode = Guid.NewGuid().ToString();
            listPosition.BrandId = brandId;
            listPosition.TotalProduct = totalProduct;
            listPosition.CreateDate = DateOnly.FromDateTime(DateTime.Now);

            Expression<Func<Brand, bool>> condition = x => x.BrandId == brandId && (x.Status != (int)Status.Deleted);
            var entity = await _unitOfWork.BrandRepository.GetByCondition(condition);
            if (entity == null)
            {
                throw new Exception("Không tìm thấy brand");
            }
            await _unitOfWork.ListPositionRepository.Insert(listPosition);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            if (result)
            {
                return _mapper?.Map<ListPositionDTO>(listPosition)!;
            }
            return null!;
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var listPosition = await _unitOfWork.ListPositionRepository.GetByID(id);
            if (listPosition == null)
                return false;

            _unitOfWork.ListPositionRepository.Delete(listPosition);
            await _unitOfWork.SaveAsync();
            return true;
        }
    }
}
