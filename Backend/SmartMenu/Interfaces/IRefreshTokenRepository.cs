using Microsoft.IdentityModel.Tokens;
using SmartMenu.Entities;

namespace SmartMenu.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken?> GetRefreshTokenAsync(string refreshTokenValue);
        Task<RefreshToken?> CheckRefreshTokenByUserIdAsync(int userId);

        Task<bool> RemoveRefreshTokenAsync(RefreshToken refreshToken);
        TokenValidationParameters GetTokenValidationParameters();
    }
}
