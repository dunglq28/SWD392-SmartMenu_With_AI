using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Token;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IAccountService
    {
        public  Task<AppUserDTO?> CheckLoginAsync(string userName, string password);
        public  Task<TokenDto> GenerateAccessTokenAsync(int id);
    }
}
