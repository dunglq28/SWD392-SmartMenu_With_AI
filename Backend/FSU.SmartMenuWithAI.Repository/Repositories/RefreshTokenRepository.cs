﻿using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using FSU.SmartMenuWithAI.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using System.Text;

namespace FSU.SmartMenuWithAI.Repository.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly SmartMenuContext _context;
        private readonly IConfiguration _configuration;

        public RefreshTokenRepository(SmartMenuContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }
        public async Task<RefreshToken?> GetRefreshTokenAsync(string refreshTokenValue)
        {
            return await _context.RefreshTokens.FirstOrDefaultAsync(x => x.RefreshTokenValue == refreshTokenValue);
        }

        public async Task<RefreshToken?> CheckRefreshTokenByUserIdAsync(int userId)
        {
            return await _context.RefreshTokens.FirstOrDefaultAsync(x => x.UserId == userId);
        }

        public TokenValidationParameters GetTokenValidationParameters()
        {
            return new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidAudience = _configuration["JWT:ValidAudience"],
                ValidIssuer = _configuration["JWT:ValidIssuer"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"])),
                ClockSkew = TimeSpan.Zero,
                ValidateLifetime = false //ko kiểm tra token hết hạn
            };
        }

        public async Task<bool> RemoveRefreshTokenAsync(RefreshToken refreshToken)  
        {
            _context.RefreshTokens.Remove(refreshToken);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}