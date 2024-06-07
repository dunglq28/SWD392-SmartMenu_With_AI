using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.API.Validations;
using FSU.SmartMenuWithAI.Service.ISerivice;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Model;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Category;
using FSU.SmartMenuWithAI.BussinessObject.Common.Constants;

namespace FSU.SmartMenuWithAI.API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly AddCategoriesValidation _addCategoryValidation;

        public CategoryController(ICategoryService appUserService)
        {
            _categoryService = appUserService;
            _addCategoryValidation = new AddCategoriesValidation();
        }
        [HttpPost(APIRoutes.Category.Add, Name = "AddCategoryAsync")]
        public async Task<IActionResult> AddAsync([FromBody] AddCagetoryDTO reqObj)
        {
            try
            {
                var validation = await _addCategoryValidation.ValidateAsync(reqObj);
                if (!validation.IsValid)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Your information are not suitable",
                        Data = null,
                        IsSuccess = false
                    });
                }
                var category = await _categoryService.Insert(reqObj);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "New category successfully",
                    Data = category,
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

        //[Authorize(Roles = UserRoles.Admin + UserRoles.BrandManager)]
        [HttpDelete(APIRoutes.Category.Delete, Name = "DeleteCategoryAsync")]
        public async Task<IActionResult> DeleteAsync([FromQuery] int id)
        {
            try
            {
                var result = await _categoryService.Delete(id);
                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Can not delete this category",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Delete category successfully",
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

        //[Authorize(Roles = UserRoles.Admin + UserRoles.BrandManager)]
        [HttpPut(APIRoutes.Category.Update, Name = "UpdateCategoryAsync")]
        public async Task<IActionResult> UpdateCategoryAsync(int id, [FromBody] string cagetoryName)
        {
            try
            {

                if (cagetoryName.IsNullOrEmpty())
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Thông tin không được để trống",
                        Data = null,
                        IsSuccess = false
                    });
                }
                var result = await _categoryService.UpdateAsync(id, cagetoryName);

                if (result == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Can not update this category",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Update category successfully",
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

        //[Authorize(Roles = UserRoles.Admin + UserRoles.BrandManager + UserRoles.Store)]
        [HttpGet(APIRoutes.Category.GetAll, Name = "GetCategoriesAsync")]
        public async Task<IActionResult> GetAllAsync([FromQuery] int brandID, string? searchKey = null, int pageNumber = Page.DefaultPageIndex, int PageSize = Page.DefaultPageSize)
        {
            try
            {
                var allAccount = await _categoryService.GetAllAsync(searchKey:searchKey!, brandID: brandID, pageIndex: pageNumber, pageSize: PageSize);

                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "get cagetory successfully",
                    Data = allAccount,
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

        //[Authorize(Roles = UserRoles.Admin + UserRoles.BrandManager + UserRoles.Store)]
        [HttpGet(APIRoutes.Category.GetByID, Name = "GetCategoryByID")]
        public async Task<IActionResult> GetAsync([FromQuery] int Id)
        {
            try
            {
                var category = await _categoryService.GetAsync(Id);

                if (category == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Can not find this category",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "get category successfully",
                    Data = category,
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
