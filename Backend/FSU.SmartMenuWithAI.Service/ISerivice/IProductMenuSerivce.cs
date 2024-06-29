//using FSU.SmartMenuWithAI.Service.Models.Pagination;
//using FSU.SmartMenuWithAI.Service.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace FSU.SmartMenuWithAI.Service.ISerivice
//{
//    public interface IProductMenuSerivce
//    {
//        Task<PageEntity<ProductMenuDTO>> GetAllAsync(
//            int menuID,
//            string? searchKey,
//            int? pageIndex = null, // Optional parameter for pagination (page number)
//            int? pageSize = null); // Optional parameter for pagination (number of records per page)

//        Task<ProductMenuDTO?> GetByID(int menuId, int productID);

//        Task<List<ProductMenuDTO>> Insert(int MenuId, List<CreateProductMenuDTO> entity);

//        Task<bool> Delete(int menuId, int productId);

//        Task<ProductMenuDTO?> Update(ProductMenuDTO entityToUpdate);

//        Task<List<ProductDTO>> getProductNotInMenu(int menuId, int brandId);


//    }
//}
