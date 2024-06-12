using FSU.SmartMenuWithAI.API.Payloads.Request.Menu;
using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FSU.SmartMenuWithAI.API.Common.Constants;

namespace FSU.SmartMenuWithAI.API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class ProductMenuController : ControllerBase
    {
        private readonly IProductMenuSerivce _proMeService;

        public ProductMenuController(IProductMenuSerivce promeService)
        {
            _proMeService = promeService;
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPost(APIRoutes.ProductMenu.Add, Name = "AddProductMenuAsync")]
        public async Task<IActionResult> AddAsync([FromBody] AddProductMenuRequest reqObj)
        {
            try
            {
                var dto = new List<CreateProductMenuDTO>();
                dto = reqObj.ProductsAddToMenu;
                var productAddToMenu = await _proMeService.Insert(reqObj.MenuId, dto);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Thêm sản phẩm vào menu thành công",
                    Data = productAddToMenu,
                    IsSuccess = true
                });


            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpDelete(APIRoutes.ProductMenu.Delete, Name = "DeleteProductInMenuAsync")]
        public async Task<IActionResult> DeleteAsynce([FromQuery(Name = "menu-id")] int menuId, [FromQuery(Name = "product-id")] int productId)
        {
            try
            {
                var result = await _proMeService.Delete(menuId: menuId, productId: productId);
                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tồn tại sản phẩm trong menu",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Xoá thành công",
                    Data = null,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPut(APIRoutes.ProductMenu.Update, Name = "UpdateProductInMenuAsync")]
        public async Task<IActionResult> UpdateUserAsync([FromBody] UpdateProductMenuRequest reqObj)
        {
            try
            {
                var dto = new ProductMenuDTO
                {
                    MenuId = reqObj.MenuId,
                    ProductId = reqObj.ProductId,
                    Price = reqObj.Price,
                    DisplayIndex = reqObj.DisplayIndex,
                };
                var result = await _proMeService.Update(dto);

                if (result == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy thông tin menu",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Cập nhật thành công",
                    Data = result,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.ProductMenu.GetAll, Name = "GetProdutInMenuAsync")]
        public async Task<IActionResult> GetAllAsync([FromQuery(Name = "menu-id")] int menuId 
            ,[FromQuery(Name = "search-key")] string? searchKey
            , [FromQuery(Name = "page-number")] int pageNumber = Page.DefaultPageIndex
            , [FromQuery(Name = "page-size")] int PageSize = Page.DefaultPageSize)
        {
            try
            {
                var menus = await _proMeService.GetAllAsync(menuID: menuId, searchKey: searchKey, pageIndex: pageNumber, pageSize: PageSize);

                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Lấy thông tin thành công",
                    Data = menus,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.ProductMenu.GetByID, Name = "GetProductMenuByID")]
        public async Task<IActionResult> GetAsync([FromQuery(Name = "menu-id")] int menuId, [FromQuery(Name = "product-id")] int productId)
        {
            try
            {
                var user = await _proMeService.GetByID(menuId: menuId, productID: productId);

                if (user == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy thông tin",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Lấy thông tin thành công",
                    Data = user,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        } //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.ProductMenu.GetProductNotInMenu, Name = "GetProductNotInMenu")]
        public async Task<IActionResult> GetProductNotInMenuAsync([FromQuery(Name = "menu-id")] int menuId, [FromQuery(Name = "brand-id")] int brandid)
        {
            try
            {
                var products = await _proMeService.getProductNotInMenu(menuId: menuId, brandId: brandid);

                if (products == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy sản phẩm nào",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Lấy thông tin thành công",
                    Data = products,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }
    }
}

