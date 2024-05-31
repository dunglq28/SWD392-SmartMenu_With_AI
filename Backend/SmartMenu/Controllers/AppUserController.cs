﻿using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SmartMenu.Common.Constants;
using SmartMenu.DTOs;
using SmartMenu.Interfaces;
using SmartMenu.Payloads;
using SmartMenu.Payloads.Requests;
using SmartMenu.Payloads.Responses;
using SmartMenu.Utils;
using SmartMenu.Validations;

namespace SmartMenu.Controllers
{
    public class AppUserController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly AddAppUserValidation _AddUserValidation;

        public AppUserController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _AddUserValidation = new AddAppUserValidation();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost(APIRoutes.AppUser.Add, Name = "AddUserAsync")]
        public async Task<IActionResult> AddAsync([FromBody] AddAppUserRequest reqObj)
        {
            try
            {
                var validation = await _AddUserValidation.ValidateAsync(reqObj);
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
                var UserAdd = await _unitOfWork.AccountRepository.AddAsync(reqObj.UserName, reqObj.Password, reqObj.RoleId, reqObj.IsActive);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "New user successfully",
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

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete(APIRoutes.AppUser.Delete, Name = "DeleteUserAsync")]
        public async Task<IActionResult> DeleteAsynce([FromQuery] int id)
        {
            try
            {
                var result = await _unitOfWork.AccountRepository.DeleteAsync(id);
                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Can not delete this account",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Delete user successfully",
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

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut(APIRoutes.AppUser.Update, Name = "UpdateUserAsync")]
        public async Task<IActionResult> UpdateAsync(int id, [FromBody] UpdateAppUserRequest reqObj)
        {
            try
            {
                var result = await _unitOfWork.AccountRepository
                    .UpdateAsync(id, reqObj.Password, reqObj.RoleId, reqObj.IsActive, reqObj.Status);
                if (result == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Can not update this account",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Update user successfully",
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

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.AppUser.GetAll, Name = "GetUsersAsync")]
        public async Task<IActionResult> GetAllAsync([FromQuery] int pageNumber, int PageSize, int currIdLoginID, string searchKey)
        {
            try
            {
                var allAccount = await _unitOfWork.AccountRepository.GetAllAsync(currIdLoginID, searchKey);
                var paging = PaginationHelper.PaginationAsync(pageNumber, allAccount, PageSize);

                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Update user successfully",
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

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.AppUser.GetByID, Name = "GetUserByID")]
        public async Task<IActionResult> GetAsync([FromQuery] int Id, int currIdLoginID)
        {
            try
            {
                var user = await _unitOfWork.AccountRepository.GetAsync(Id, currIdLoginID);

                if (user == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Can not find this user",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "get user successfully",
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