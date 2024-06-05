using FSU.SmartMenuWithAI.BussinessObject.DTOs.Token;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;


namespace FSU.SmartMenuWithAI.Repository.Interfaces
{
    public interface IAccountRepository
    {
        Task<AppUser?> CheckLoginAsync(String userName, String password);
        Task<TokenDto?> GenerateAccessTokenAsync(int id);
    }
}
