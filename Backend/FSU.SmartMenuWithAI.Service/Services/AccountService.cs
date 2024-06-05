using AutoMapper;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Token;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class AccountService : IAccountService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AccountService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<AppUserDTO?> CheckLoginAsync(LoginDTO reqObj)
        {
            var user = await _unitOfWork.AccountRepository
                .CheckLoginAsync(reqObj.UserName, reqObj.Password);

            var userDTO = _mapper.Map<AppUserDTO>(user);
            return userDTO;
        }

        public async Task<TokenDto> GenerateAccessTokenAsync(int id)
        {
            var token = await _unitOfWork.AccountRepository.GenerateAccessTokenAsync(id);
            return token;
        }
    }
}
