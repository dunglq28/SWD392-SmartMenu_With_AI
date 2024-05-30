using AutoMapper;
using Humanizer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Common.Enums;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;
using SmartMenu.Utils;
using static Amazon.S3.Util.S3EventNotification;

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

        public async Task<AppUserDto> AddAsync(string username, string password, int roleID, bool isActive)
        {
            var user = new AppUser();
            user.UserCode = Guid.NewGuid().ToString();
            user.UserName = username;
            user.Password = password;
            user.RoleId = roleID;
            user.IsActive = isActive;
            user.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            user.Status = (int)Status.Exist;

            _context.AppUsers.Add(user);
            await _context.SaveChangesAsync();

            return _mapper.Map<AppUserDto>(user);

        }

        public async Task<AppUserDto?> CheckLoginAsync(string userName, string password)
        {
            var user = await _context.AppUsers.SingleOrDefaultAsync(u => u.UserName == userName && u.Password == password);
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

        public async Task<IEnumerable<AppUserDto>> GetAllAsync(int currIdLoginID, string searchKey)
        {
            var entities = await _context.AppUsers.Where( x=> x.UserId != currIdLoginID).ToListAsync();
            if(!string.IsNullOrEmpty(searchKey))
            {
                entities = entities.Where(x => x.UserName.Contains(searchKey)).OrderBy( x=> x.UserId).ToList();
            }
            
            return _mapper.Map<IEnumerable<AppUserDto>>(entities);
        }

        public async Task<AppUserDto?> GetAsync(int id, int currIdLoginID)
        {
            var entities = await _context.AppUsers.FirstOrDefaultAsync(x => x.UserId != currIdLoginID && x.UserId == id);
            return _mapper.Map<AppUserDto>(entities);
        }

        public async Task<AppUserDto> UpdateAsync(int id, string password, int RoleId, bool IsActive, int status)
        {
            var entity = await _context.AppUsers.FindAsync(id);
            if (entity == null)
            {
                return default(AppUserDto);
            }
            entity.Password = password;
            entity.RoleId = RoleId;
            entity.IsActive = IsActive;
            entity.Status = status;
            await _context.SaveChangesAsync();
            return _mapper.Map<AppUserDto>(entity);
        }
    }
}
