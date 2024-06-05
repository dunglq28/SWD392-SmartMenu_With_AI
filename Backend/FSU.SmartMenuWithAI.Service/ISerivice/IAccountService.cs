using FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Token;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IAccountService
    {
        public  Task<AppUserDTO?> CheckLoginAsync(LoginDTO reqObj);
        public  Task<TokenDto> GenerateAccessTokenAsync(int id);
    }
}
