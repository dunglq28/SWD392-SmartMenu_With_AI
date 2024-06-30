using FSU.SmartMenuWithAI.API.Common.Constants;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.API.Payloads.Request.ListPosition;
using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Models;
using Microsoft.AspNetCore.Mvc;

namespace FSU.SmartMenuWithAI.API.Controllers
{
    public class ListPositionController : ControllerBase
    {
        private readonly IListPositionService _listPositionService;

        public ListPositionController(IListPositionService listPositionService)
        {
            _listPositionService = listPositionService;
        }

        //[Authorize(Roles = UserRoles)]
        [HttpGet(APIRoutes.ListPosition.GetByID, Name = "GetListPositionByID")]
        public async Task<IActionResult> GetByIdAsync(int id)
        {
            try
            {
                var listPosition = await _listPositionService.GetByID(id);
                if (listPosition == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy vị trí",
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tìm thành công",
                    Data = listPosition,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Lỗi khi tải!" + ex.Message,
                    IsSuccess = false
                });
            }
        }
        //[Authorize(Roles = UserRoles)]
        [HttpGet(APIRoutes.ListPosition.GetByBrandID, Name = "get-by-brand-id-async")]
        public async Task<IActionResult> GetAllAsync([FromQuery(Name = "search-key")] int searchKey
            , [FromQuery(Name = "page-number")] int pageNumber = Page.DefaultPageIndex
            , [FromQuery(Name = "page-size")] int PageSize = Page.DefaultPageSize)
        {
            try
            {
                var listPs = await _listPositionService.GetListPositionByBrandID(searchKey, pageIndex: pageNumber, pageSize: PageSize);

                if (listPs == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy vị trí",
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tìm thành công",
                    Data = listPs,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Lỗi khi tải!" + ex.Message,
                    IsSuccess = false
                });
            }
        }
        //[Authorize(Roles = UserRoles)]
        [HttpPost(APIRoutes.ListPosition.Add, Name = "AddListPosition")]
        public async Task<IActionResult> CreateAsync([FromBody] CreateRequest request)
        {
            try
            {
                var createdListPosition = await _listPositionService.Insert(request.TotalProduct, request.BrandId);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status201Created,
                    Message = "Tạo mới thành công",
                    Data = createdListPosition,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Lỗi khi tạo mới!" + ex.Message,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles)]
        [HttpPut(APIRoutes.ListPosition.Update, Name = "UpdateListPosition")]
        public async Task<IActionResult> UpdateAsync([FromForm] int id, [FromForm(Name = "total-product")] int totalProduct)
        {
            try
            {
                var updatedListPosition = await _listPositionService.UpdateAsync(id, totalProduct);
                if (updatedListPosition == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Cập nhật không thành công",
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Cập nhật thành công",
                    Data = updatedListPosition,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Lỗi khi cập nhật!" + ex.Message,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles)]
        [HttpDelete(APIRoutes.ListPosition.Delete, Name = "DelListPosition")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                var isDeleted = await _listPositionService.DeleteAsync(id);
                if (!isDeleted)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Xoá không thành công",
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Xoá thành công",
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Lỗi khi xoá!" + ex.Message,
                    IsSuccess = false
                });
            }
        }
    }
}
