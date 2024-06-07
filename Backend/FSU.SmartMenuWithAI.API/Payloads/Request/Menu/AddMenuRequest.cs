using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.API.Payloads.Request.Menu
{
    
    public class AddMenuRequest
    {
        [Required]
        public bool IsActive { get; set; }

        [Required]
        [Display(Name = "Brand ID")]
        [Range(1, int.MaxValue, ErrorMessage = "Brand ID must be a positive integer.")]
        public int BrandId { get; set; }
    }
}
