using FSU.SmartMenuWithAI.BussinessObject.DTOs.Brand;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Repository.Interfaces
{
    public interface IBrandRepository
    {
        Task<Brand> GetBrandByName(string name);
    }
}
