using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Models
{
    public class MenuSegmentDTO
    {
        public int Priority { get; set; }

        public int MenuId { get; set; }

        public int SegmentId { get; set; }

        public List<Repository.Entities.CustomerSegment> CustomerSegments {  get; set; } = new List<Repository.Entities.CustomerSegment>();
    }
}
