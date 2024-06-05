using Microsoft.IdentityModel.Tokens;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;

namespace FSU.SmartMenuWithAI.Repository.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken?> GetRefreshTokenAsync(string refreshTokenValue);
        Task<RefreshToken?> CheckRefreshTokenByUserIdAsync(int userId);

        Task<bool> RemoveRefreshTokenAsync(RefreshToken refreshToken);
        TokenValidationParameters GetTokenValidationParameters();
    }
}
