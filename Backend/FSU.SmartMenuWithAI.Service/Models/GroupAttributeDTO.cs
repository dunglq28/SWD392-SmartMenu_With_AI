using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Models
{
    public class GroupAttributeDTO
    {
        public int GroupAttributeId { get; set; }

        public string GroupAttributeName { get; set; } = null!;

        public DateOnly CreateDate { get; set; }
    }
}
