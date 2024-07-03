using Amazon.Rekognition.Model;
using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Menu;
using FSU.SmartMenuWithAI.Service.Utils;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class SegmentAttributeService : ISegmentAttributeService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public SegmentAttributeService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<SegmentAttributeDTO> GetCusSegmentAsync(CustomerFaceRognizeDTO imageValue)
        {
            int targetAge = imageValue.AgeRange;
            string targetGender = imageValue.Gender!;
            string targetSession = imageValue.Session!;

            var AttributeAgeID = await _unitOfWork.AttributeRepository.GetByCondition(x => x.AttributeName.ToLower().Equals(nameof(imageValue.AgeRange)));
            var AttributeGenderID = await _unitOfWork.AttributeRepository.GetByCondition(x => x.AttributeName.ToLower().Equals(nameof(imageValue.AgeRange)));
            var AttributeSessionID = await _unitOfWork.AttributeRepository.GetByCondition(x => x.AttributeName.ToLower().Equals(nameof(imageValue.AgeRange)));
            // Lấy các SegmentID cho độ tuổi phù hợp
            Expression<Func<CustomerSegment, bool>> condition = cs =>
                cs.SegmentAttributes.Any(sa => sa.AttributeId == AttributeAgeID.AttributeId && AgeHelper.IsAgeInRange(targetAge, sa.Value)) &&
                cs.SegmentAttributes.Any(sa => sa.AttributeId == AttributeGenderID.AttributeId && sa.Value == targetGender) &&
                cs.SegmentAttributes.Any(sa => sa.AttributeId == AttributeSessionID.AttributeId && sa.Value == targetSession);
            var result = await _unitOfWork.CustomerSegmentRepository.GetByCondition(condition);

            var mapdto = _mapper.Map<SegmentAttributeDTO?>(result);
            return mapdto;
        }
    }
}
