using Microsoft.AspNetCore.Mvc;
using SmartMenu.Payloads.Responses;
using SmartMenu.Payloads;
using SmartMenu.Interfaces;
using SmartMenu.Services;
using SmartMenu.Payloads.Requests;
using SmartMenu.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using SmartMenu.Repositories;

namespace SmartMenu.Controllers
{
    public class AuthenticationController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public AuthenticationController(IUnitOfWork unitOfWork, IRefreshTokenRepository refreshTokenRepository)
        {
            _unitOfWork = unitOfWork;
            _refreshTokenRepository = refreshTokenRepository;
        }

        [HttpPost(APIRoutes.Authentication.Login, Name = "LoginAsync")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequest reqObj)
        {
            try
            {
                var userDto = await _unitOfWork.AccountRepository.CheckLoginAsync(reqObj.UserName, reqObj.Password);
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
                var tokenExist = await _refreshTokenRepository.CheckRefreshTokenByUserIdAsync(userDto.UserId);
                if (tokenExist != null)
                {
                    var reuslt = await _refreshTokenRepository.RemoveRefreshTokenAsync(tokenExist);
                }
                var token = await _unitOfWork.AccountRepository.GenerateAccessTokenAsync(userDto.UserId);
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
        public async Task<IActionResult> RefreshToken(TokenDto token)
        {
            try
            {
                var jwtTokenHandler = new JwtSecurityTokenHandler();
                var tokenValidateParam = _refreshTokenRepository.GetTokenValidationParameters();

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
                var utcExpireDate = long.Parse(tokenInVerification.Claims.FirstOrDefault(x => x.Type == JwtRegisteredClaimNames.Exp).Value);
                var expireDate = Utils.DateHelper.ConvertUnixTimeToDateTime(utcExpireDate);

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

                var refreshToken = await _refreshTokenRepository.GetRefreshTokenAsync(token.RefreshToken);

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

                if (await _refreshTokenRepository.RemoveRefreshTokenAsync(refreshToken))
                {
                    var user = await _unitOfWork.AccountRepository.GetAsync(refreshToken.UserId);
                    var newToken = await  _unitOfWork.AccountRepository.GenerateAccessTokenAsync(user.UserId);
                    return Ok(new BaseResponse 
                    {
                        StatusCode = StatusCodes.Status200OK,
                        IsSuccess = true,
                        Message = "Renew token success",
                        Data = newToken
                    });
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
