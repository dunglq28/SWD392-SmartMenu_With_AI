using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartMenu.Interfaces;
using SmartMenu.Payloads.Requests;
using SmartMenu.Payloads.Responses;
using SmartMenu.Payloads;
using SmartMenu.Utils;
using SmartMenu.Validations;
using SmartMenu.DTOs;

namespace SmartMenu.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly AddStoreValidation _AddStoreValidation;
        private readonly updateStoreValidation _updateStoreValidation;

        public StoreController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _AddStoreValidation = new AddStoreValidation();
            _updateStoreValidation = new updateStoreValidation();
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPost(APIRoutes.Store.Add, Name = "AddStoreAsync")]
        public async Task<IActionResult> AddAsync([FromBody] AddStoreRequest reqObj)
        {
            try
            {
                var validation = await _AddStoreValidation.ValidateAsync(reqObj);
                if (!validation.IsValid)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Thông tin của bạn chưa chính xác",
                        Data = null,
                        IsSuccess = false
                    });
                }
                var UserAdd = await _unitOfWork.StoreRepository.AddAsync(reqObj);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Thêm cửa hàng thành công",
                    Data = UserAdd,
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
        [HttpDelete(APIRoutes.Store.Delete, Name = "DeleteStoreAsync")]
        public async Task<IActionResult> DeleteAsynce([FromQuery] int id)
        {
            try
            {
                var result = await _unitOfWork.StoreRepository.DeleteAsync(id);
                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Cửa hàng không tồn tại",
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
        [HttpPut(APIRoutes.Store.Update, Name = "UpdateStoreAsync")]
        public async Task<IActionResult> UpdateUserAsync(int id, [FromBody] UpdateStoreRequest reqObj)
        {
            try
            {
                var validation = _updateStoreValidation.Validate(reqObj);
                if(!validation.IsValid)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Thông tin của bạn chưa chính xác",
                        Data = null,
                        IsSuccess = false
                    });
                }
                var result = await _unitOfWork.StoreRepository
                    .UpdateAsync(id, reqObj);
                if (result == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy thông tin cửa hàng",
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
        [HttpGet(APIRoutes.Store.GetAll, Name = "GetStoreAsync")]
        public async Task<IActionResult> GetAllAsync([FromQuery] int brandID, string? searchKey, int pageNumber = 1, int PageSize = 5)
        {
            try
            {
                var brands = await _unitOfWork.StoreRepository.GetAllAsync(searchKey!, brandID);
                var paging = PaginationHelper.PaginationAsync(pageNumber, brands!, PageSize);

                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Lấy thông tin thành công",
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

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.Store.GetByID, Name = "GetStoreByID")]
        public async Task<IActionResult> GetAsync([FromQuery] int Id)
        {
            try
            {
                var user = await _unitOfWork.StoreRepository.GetAsync(Id);

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
        }
    }
}
