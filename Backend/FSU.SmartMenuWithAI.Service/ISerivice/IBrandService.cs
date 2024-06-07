using FSU.SmartMenuWithAI.Service.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FSU.SmartMenuWithAI.Service.ISerivice
{
    public interface IBrandService
    {
        Task<BrandDTO> GetByID(int id);
        Task<BrandDTO> GetByNameAsync(string brandName);
        Task<bool> Insert(string brandName, int userID, string imgUrl, string imgName);
        Task<bool> Delete(int id);
        Task<bool> Update(int brandID, string brandName, string imgUrl, string imgName);
    }
}
