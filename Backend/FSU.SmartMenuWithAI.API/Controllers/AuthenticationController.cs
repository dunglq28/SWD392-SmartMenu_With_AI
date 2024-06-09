﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using System.IdentityModel.Tokens.Jwt;
using FSU.SmartMenuWithAI.Repository.Interfaces;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.API.Payloads.Request.AppUser;
using FSU.SmartMenuWithAI.Service.Models.Token;
using FSU.SmartMenuWithAI.Service.Utils;
using FSU.SmartMenuWithAI.Service.ISerivice;

namespace FSU.SmartMenuWithAI.API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IAppUserService _appUserService;
        private readonly IRefreshTokenService _refreshTokenService;

        public AuthenticationController(IAccountService accountService, IRefreshTokenService refreshTokenService, IAppUserService appUserService)
        {
            _accountService = accountService;
            _refreshTokenService = refreshTokenService;
            _appUserService = appUserService;
        }

        [HttpPost(APIRoutes.Authentication.Login, Name = "LoginAsync")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest reqObj)
        {
            try
            {
                var userDto = await _accountService.CheckLoginAsync(reqObj.UserName, reqObj.Password);

                if (userDto == null)
                {
                    return Unauthorized(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status401Unauthorized,
                        Message = "Sai tài khoản hoặc mật khẩu",
                        Data = null,
                        IsSuccess = false
                    });
                }

                if (userDto.IsActive == false)
                {
                    var baseResponse = new BaseResponse
                    {
                        StatusCode = StatusCodes.Status403Forbidden,
                        Message = "Tài khoản của bạn đã bị khóa. Vui lòng liên hệ với quản trị viên để biết thêm thông tin",
                        Data = null,
                        IsSuccess = false
                    };

                    return new ObjectResult(baseResponse)
                    {
                        StatusCode = StatusCodes.Status403Forbidden
                    };
                }
                var tokenExist = await _refreshTokenService
                    .CheckRefreshTokenByUserIdAsync(userDto.UserId!.Value);

                if (tokenExist != null)
                {
                    var reuslt = await _refreshTokenService
                        .RemoveRefreshTokenAsync(tokenExist);
                }

                var token = await _accountService.GenerateAccessTokenAsync(userDto.UserId.Value);


                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Đăng nhập thành công",
                    Data = new
                    {
                        token,
                        userDto.UserId,
                        userDto.RoleId
                    },
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

        [HttpPost(APIRoutes.Authentication.RefreshToken, Name = "RefreshTokenAsync")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenDto token)
        {
            try
            {
                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var tokenValidateParam = _refreshTokenService.GetTokenValidationParameters();

                //check: AccessToken valid format
                var tokenInVerification = jwtTokenHandler.ValidateToken(token.AccessToken, tokenValidateParam, out var validatedToken);

                //check: Check alg
                if (validatedToken is JwtSecurityToken jwtSecurityToken)
                {
                    var result = jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha512Signature, StringComparison.InvariantCultureIgnoreCase);
                    if (!result) //false
                    {
                        return BadRequest(new BaseResponse
                        {
                            StatusCode = StatusCodes.Status400BadRequest,
                            Data = null,
                            IsSuccess = false,
                            Message = "Invalid token"
                        });
                    }
                }

                //check: Check accessToken expire?
                var utcExpireDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp)!.Value);
                var expireDate = DateHelper.ConvertUnixTimeToDateTime(utcExpireDate);

                if (expireDate > DateTime.UtcNow)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Data = null,
                        IsSuccess = false,
                        Message = "Access token has not yet expired"
                    });
                }

                var refreshToken = await _refreshTokenService.GetRefreshTokenAsync(token.RefreshToken!);

                if (refreshToken == null)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Data = null,
                        IsSuccess = false,
                        Message = "Refresh token does not exist"
                    });
                }

                var jti = tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Jti).Value;
                if (refreshToken.JwtId != jti)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Data = null,
                        IsSuccess = false,
                        Message = "Token doesn't match"
                    });
                }

                if (await _refreshTokenService.RemoveRefreshTokenAsync(refreshToken))
                {
                    var user = await _appUserService.GetByID(refreshToken.UserId);
                    if (user != null)
                    {

                        var newToken = await _accountService.GenerateAccessTokenAsync(user!.UserId.Value);
                        return Ok(new BaseResponse
                        {
                            StatusCode = StatusCodes.Status200OK,
                            IsSuccess = true,
                            Message = "Renew token success",
                            Data = newToken
                        });
                    } 
                }

                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Data = null,
                    IsSuccess = false,
                    Message = "Failed to update refresh token"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Data = null,
                    IsSuccess = false,
                    Message = ex.Message
                });
            }
        }


    }
}

