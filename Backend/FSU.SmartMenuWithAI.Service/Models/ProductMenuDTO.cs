using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.Models
{
    public class ProductMenuDTO
    {
        public int Price { get; set; }

        public int ProductId { get; set; }

        public int MenuId { get; set; }

        public int? DisplayIndex { get; set; }
        public string? ProductName { get; set; }
    }
}
