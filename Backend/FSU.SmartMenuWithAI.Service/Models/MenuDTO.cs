using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Models
{
    public class MenuDTO
    {
        public int? MenuId { get; set; }

        public string? MenuCode { get; set; } = null!;

        public DateOnly? CreateDate { get; set; }

        public bool? IsActive { get; set; }

        public int? BrandId { get; set; }

        public string? BrandName { get; set; }
    }
}
