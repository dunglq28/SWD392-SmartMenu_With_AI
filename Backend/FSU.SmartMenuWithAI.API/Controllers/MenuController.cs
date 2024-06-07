using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FSU.SmartMenuWithAI.API.Validations;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Menu;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.BussinessObject.Common.Constants;

namespace FSU.SmartMenuWithAI.API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {

        
            private readonly IMenuService _menuService;
            private readonly AddMenuValidation _addMenuValidation;

            public MenuController(IMenuService menuService)
            {
                _menuService = menuService;
                _addMenuValidation = new AddMenuValidation();
            }

            //[Authorize(Roles = UserRoles.Admin)]
            [HttpPost(APIRoutes.Menu.Add, Name = "AddMenuAsync")]
            public async Task<IActionResult> AddAsync([FromBody] AddMenuDTO reqObj)
            {
                try
                {
                    var validation = await _addMenuValidation.ValidateAsync(reqObj);
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
                    var UserAdd = await _menuService.Insert(reqObj);
                    return Ok(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status200OK,
                        Message = "Thêm Menu thành công",
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
            [HttpDelete(APIRoutes.Menu.Delete, Name = "DeleteMenuAsync")]
            public async Task<IActionResult> DeleteAsynce([FromQuery] int id)
            {
                try
                {
                    var result = await _menuService.Delete(id);
                    if (!result)
                    {
                        return NotFound(new BaseResponse
                        {
                            StatusCode = StatusCodes.Status404NotFound,
                            Message = "Menu không tồn tại",
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
            [HttpPut(APIRoutes.Menu.Update, Name = "UpdateMenuAsync")]
            public async Task<IActionResult> UpdateUserAsync(int id, [FromBody] bool isActive)
            {
                try
                {

                    var result = await _menuService.UpdateAsync(id, isActive);
                        
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
            [HttpGet(APIRoutes.Menu.GetAll, Name = "GetMenuAsync")]
            public async Task<IActionResult> GetAllAsync([FromQuery] int brandID, int pageNumber = Page.DefaultPageIndex, int PageSize = Page.DefaultPageSize)
            {
                try
                {
                    var menus = await _menuService.GetAllAsync(brandID: brandID, pageIndex: pageNumber, pageSize: PageSize);

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
            [HttpGet(APIRoutes.Menu.GetByID, Name = "GetMenuByID")]
            public async Task<IActionResult> GetAsync([FromQuery] int Id)
            {
                try
                {
                    var user = await _menuService.GetAsync(Id);

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
