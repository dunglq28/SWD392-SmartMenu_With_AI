using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Common.Enums;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.MenuList;
using FSU.SmartMenuWithAI.Service.Models.Pagination;
using FSU.SmartMenuWithAI.Service.Utils;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class CustomerSegmentService : ICustomerSegmentService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CustomerSegmentService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<bool> Delete(int SegmentId)
        {
            Expression<Func<CustomerSegment, bool>> condition = x => x.SegmentId == SegmentId;
            var cusSegment = await _unitOfWork.CustomerSegmentRepository.GetByCondition(condition);
            if (cusSegment != null)
            {
                cusSegment.Status = (int)Status.Deleted;
                _unitOfWork.CustomerSegmentRepository.Update(cusSegment);
            }
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;

        }

        public async Task<PageEntity<CustomerSegmentDTO>> GetAllAsync(string? searchKey, int? pageIndex, int? pageSize)
        {
            Expression<Func<CustomerSegment, bool>> filter = !searchKey.IsNullOrEmpty()
                ? x => x.SegmentName.Contains(searchKey) && (x.Status == (int)Status.Exist)
                : x => x.Status != (int)Status.Deleted;
            Func<IQueryable<CustomerSegment>, IOrderedQueryable<CustomerSegment>> orderBy = q => q.OrderByDescending(x => x.SegmentName);

            var entities = await _unitOfWork.CustomerSegmentRepository.Get(filter: filter,orderBy: orderBy, pageIndex: pageIndex, pageSize: pageSize);
            var pagin = new PageEntity<CustomerSegmentDTO>();
            pagin.List = _mapper.Map<IEnumerable<CustomerSegmentDTO>>(entities).ToList();
            pagin.TotalRecord = await _unitOfWork.CustomerSegmentRepository.Count(filter);
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }

        public async Task<CustomerSegmentDTO?> GetByID(int SegmentId)
        {
            Expression<Func<CustomerSegment, bool>> filterRecord = x => x.SegmentId == SegmentId && (x.Status == (int)Status.Exist);
            var cusSegment = await _unitOfWork.CustomerSegmentRepository.GetByCondition(filterRecord);
            var mapdto = _mapper.Map<CustomerSegmentDTO>(cusSegment);
            return mapdto;
        }

        public async Task<CustomerSegmentDTO> Insert(CustomerSegmentDTO cusDTO, List<SegmentAttributeDTO> listDto)
        {
            var attributes = _mapper.Map<List<SegmentAttribute>>(listDto);
            var cusSegment = new CustomerSegment();
            cusSegment.SegmentCode = Guid.NewGuid().ToString();
            cusSegment.SegmentName = cusDTO.SegmentName;
            cusSegment.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            cusSegment.Status = (int)Status.Exist;
            cusSegment.SegmentAttributes = attributes;
            Expression<Func<CustomerSegment, bool>> duplicateName = x => x.SegmentName.ToLower().Equals(cusDTO.SegmentName.ToLower()) && (x.Status == (int)Status.Exist);
            var exist = await _unitOfWork.CustomerSegmentRepository.GetByCondition(duplicateName);
            if (exist != null)
            {
                throw new DbUpdateException("Tên đã tồn tại");
            }
            await _unitOfWork.CustomerSegmentRepository.Insert(cusSegment);
            if (await _unitOfWork.SaveAsync() > 0)
            {
                var mapdto = _mapper.Map<CustomerSegmentDTO?>(cusSegment)!;
                return mapdto;
            }
            return null!;
        }

        public async Task<CustomerSegmentDTO?> Update(int segmentId, string segmentName)
        {
            var cusSegToUpdate = await _unitOfWork.CustomerSegmentRepository.GetByID(segmentId);
            if (cusSegToUpdate == null || (cusSegToUpdate.Status == (int)Status.Deleted))
            {
                return null!;
            }
            Expression<Func<CustomerSegment, bool>> duplicateName = x => x.SegmentName.ToLower().Equals(segmentName.ToLower()) && (x.Status == (int)Status.Exist);
            var exist = await _unitOfWork.CustomerSegmentRepository.GetByCondition(duplicateName);
            if (exist != null)
            {
                throw new DbUpdateException("Tên đã tồn tại");
            }
            if (!string.IsNullOrEmpty(segmentName))
            {
                cusSegToUpdate.SegmentName = segmentName;
            }

            _unitOfWork.CustomerSegmentRepository.Update(cusSegToUpdate);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            if (result)
            {
                return _mapper?.Map<CustomerSegmentDTO>(cusSegToUpdate)!;
            }
            return null;
        }
    }
}

