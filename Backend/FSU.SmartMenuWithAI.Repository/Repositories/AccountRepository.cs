using FSU.SmartMenuWithAI.BussinessObject.Utils;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Token;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using FSU.SmartMenuWithAI.Repository.Interfaces;

namespace FSU.SmartMenuWithAI.Repository.Repositories
{
    public class AccountRepository  : IAccountRepository
    {
        private readonly SmartMenuContext _context;
        private readonly IConfiguration _configuration;

        public AccountRepository(SmartMenuContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<AppUser?> CheckLoginAsync(string userName, string password)
        {
            password = PasswordHelper.ConvertToEncrypt(password);
            var user = await _context.AppUsers.FirstOrDefaultAsync(u => u.UserName == userName && u.Password == password && u.Status == 1);
            if (user == null)
            {
                return null;
            }
            return user;
        }

        public async Task<TokenDto> GenerateAccessTokenAsync(int id)
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
