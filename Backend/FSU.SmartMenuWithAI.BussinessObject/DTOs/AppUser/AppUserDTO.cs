using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser
{
    public class AppUserDTO
    {
        public int? UserId { get; set; }

        public string? UserCode { get; set; } = null!;

        public string UserName { get; set; } = null!;

        public string? Password { get; set; } = null!;

        public int RoleId { get; set; }
        public string RoleName { get; set; } = null!;

        public DateOnly CreateDate { get; set; }

        public bool IsActive { get; set; }

        public int Status { get; set; }
    }

    public class CreateAppUserDTO
    {
        public string UserName { get; set; } = null!;

        public string? Password { get; set; } = null!;

        public int RoleId { get; set; }
        public bool IsActive { get; set; }

    }
    public class UpdateAppUserDTO
    {

        public string? Password { get; set; } = null!;
        public bool IsActive { get; set; }
        public int Status { get; set; }

    }
}
