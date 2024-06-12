using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class GroupAttributeService : IGroupAttributeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GroupAttributeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }
        public async Task<GroupAttributeDTO> Insert(string groupName)
        {
            var group = new GroupAttribute();
            group.GroupAttributeName = groupName;
            group.CreateDate = DateOnly.FromDateTime(DateTime.Now);

            Expression<Func<GroupAttribute, bool>> condition = x => x.GroupAttributeName == group.GroupAttributeName /*&& (x.Status != (int)Status.Deleted)*/;
            var entity = await _unitOfWork.GroupAttributeRepository.GetByCondition(condition);
            if (entity != null)
            {
                throw new Exception("Tên đã tồn tại");
            }
            await _unitOfWork.GroupAttributeRepository.Insert(group);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            if (!result)
            {
                throw new Exception("Lỗi khi thêm vào database!");
            }
            return _mapper?.Map<GroupAttributeDTO>(group)!;
        }

        public async Task<bool> Delete(int id)
        {
            var brandDelete = await _unitOfWork.GroupAttributeRepository.GetByID(id);
            if (brandDelete == null)
            {
                return false;
            }
            _unitOfWork.GroupAttributeRepository.Delete(brandDelete);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;
        }

        public async Task<GroupAttributeDTO> Update(int id, string name)
        {
            Expression<Func<GroupAttribute, bool>> condition = x => x.GroupAttributeName == name && (x.GroupAttributeId != id);
            var entity = await _unitOfWork.GroupAttributeRepository.GetByCondition(condition);
            if (entity != null)
            {
                throw new Exception("Tên đã tồn tại");
            }

            var entityToUpdate = await _unitOfWork.GroupAttributeRepository.GetByID(id);

            if (!string.IsNullOrEmpty(name))
            {
                entityToUpdate.GroupAttributeName = name;
            }

            _unitOfWork.GroupAttributeRepository.Update(entityToUpdate);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;

            return _mapper?.Map<GroupAttributeDTO>(entityToUpdate)!;
        }
    }
}
