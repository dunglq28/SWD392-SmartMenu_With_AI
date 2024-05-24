using Microsoft.AspNetCore.Identity;
using SmartMenu.DTOs;
using SmartMenu.Entities;

namespace SmartMenu.Interfaces
{
    public interface IAccountRepository : IGenericRepository<AppUser, AppUserDto>
    {
        Task<AppUserDto?> CheckLoginAsync(String userName, String password);
        Task<TokenDto?> GenerateAccessTokenAsync(int id);


    }
}
