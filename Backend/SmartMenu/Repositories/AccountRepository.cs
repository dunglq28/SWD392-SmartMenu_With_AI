using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;
using SmartMenu.Utils;

namespace SmartMenu.Repositories
{
    public class AccountRepository : GenericRepository<AppUser, AppUserDto>, IAccountRepository
    {
        private readonly SmartMenuContext _context;
        private readonly IMapper _mapper;
        private readonly IConfiguration _configuration;

        public AccountRepository(SmartMenuContext context, IMapper mapper, IConfiguration configuration) : base(context, mapper)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        public async Task<AppUserDto?> CheckLoginAsync(string userName, string password)
        {
            var user = await _context.AppUsers.SingleOrDefaultAsync(u => u.UserName == userName && u.Password == password && u.Status == 1);
            if (user == null)
            {
                return null;
            }
            var userDto = _mapper.Map<AppUserDto>(user);
            return userDto;
        }

        public async Task<TokenDto?> GenerateAccessTokenAsync(int id)
        {
            var user = await _context.AppUsers.FindAsync(id);
            if (user == null)
            {
                return null;
            }
            var Token = await JwtHelper.GenerateAccessTokenAsync(user, _context, _configuration);
            return Token;
        }
    }
}
