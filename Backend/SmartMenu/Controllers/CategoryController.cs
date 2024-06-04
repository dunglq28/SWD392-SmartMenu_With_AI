using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartMenu.Common.Constants;
using SmartMenu.Interfaces;
using SmartMenu.Payloads.Requests;
using SmartMenu.Payloads.Responses;
using SmartMenu.Payloads;
using SmartMenu.Utils;
using SmartMenu.Validations;
using SmartMenu.DTOs;
using Microsoft.IdentityModel.Tokens;

namespace SmartMenu.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly AddCategoriesValidation _validations;

        public CategoryController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _validations = new AddCategoriesValidation();
        }

        //[Authorize(Roles = UserRoles.Admin + UserRoles.BrandManager)]
        [HttpPost(APIRoutes.Category.Add, Name = "AddCategoryAsync")]
        public async Task<IActionResult> AddAsync([FromBody] AddCagetoryRequest reqObj)
        {
            try
            {
                var validation = await _validations.ValidateAsync(reqObj);
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
                var category = await _unitOfWork.CategoryRepository.AddAsync(reqObj);
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
                var result = await _unitOfWork.CategoryRepository.DeleteAsync(id);
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
                var result = await _unitOfWork.CategoryRepository.UpdateAsync(id, cagetoryName);
                    
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
        public async Task<IActionResult> GetAllAsync([FromQuery]  string? searchKey = null, int brandID = 0, int pageNumber = 1, int PageSize = 5)
        {
            try
            {
                var allAccount = await _unitOfWork.CategoryRepository.GetAllAsync( searchKey!, brandID);
                var paging = PaginationHelper.PaginationAsync(pageNumber, allAccount!, PageSize);

                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Update cagetory successfully",
                    Data = paging,
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
                var category = await _unitOfWork.CategoryRepository.GetAsync(Id);

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
