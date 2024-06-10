using FSU.SmartMenuWithAI.API.Payloads.Request.Brand;
using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.API.Validations;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Services;
using Microsoft.AspNetCore.Mvc;
using FSU.SmartMenuWithAI.API.Payloads.Request.GroupAttribute;

namespace FSU.SmartMenuWithAI.API.Controllers
{
    public class GroupAttributeController : ControllerBase
    {
        private readonly IGroupAttributeService _groupAttributeService;

        public GroupAttributeController(IGroupAttributeService groupAttributeService)
        {
            _groupAttributeService = groupAttributeService;
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPost(APIRoutes.GroupAttribute.Add, Name = "AddGroupAttributeAsync")]
        public async Task<IActionResult> AddAsync([FromForm] CreateGroupAttributeRequest reqObj)
        {
            try
            {
              
                var groupAttributeAdd = await _groupAttributeService.Insert(reqObj.GroupAttributeName);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tạo nhóm thuộc tính mới thành công",
                    Data = groupAttributeAdd,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Lỗi khi tạo mới nhóm thuộc tính! " + ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpDelete(APIRoutes.GroupAttribute.Delete, Name = "DeleteGroupAttributeAsync")]
        public async Task<IActionResult> DeleteAsynce([FromQuery] int id)
        {
            try
            {
                var result = await _groupAttributeService.Delete(id);
                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "không tìm thấy nhóm thuộc tính",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "xoá nhóm thuộc tính thành công",
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
        [HttpPut(APIRoutes.GroupAttribute.Update, Name = "UpdateGroupAttributeAsync")]
        public async Task<IActionResult> UpdateUserAsync([FromForm] int id, [FromForm] string name)
        {
            try
            {
                var result = await _groupAttributeService.Update(id, name);
                if (result == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Cập nhật không thành công",
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
                    Message = "Lỗi khi cập nhật!" + ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }

        }
    }
}
