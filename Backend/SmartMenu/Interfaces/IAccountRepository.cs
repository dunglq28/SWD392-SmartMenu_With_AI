using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using SmartMenu.DTOs;
using SmartMenu.Entities;

namespace SmartMenu.Interfaces
{
    public interface IAccountRepository : IGenericRepository<AppUser, AppUserDto>
    {
        Task<AppUserDto?> CheckLoginAsync(String userName, String password);
        Task<TokenDto?> GenerateAccessTokenAsync(int id);
        Task<AppUserDto> AddAsync(string username, string password, int roleID, bool isActive);
        Task<IEnumerable<AppUserDto>> GetAllAsync(int currIdLoginID, string searchKey);
        Task<AppUserDto?> GetAsync(int id, int currIdLoginID);
        Task<AppUserDto> UpdateAsync(int id, string password, int RoleId, bool IsActive, int status);
    }
}
