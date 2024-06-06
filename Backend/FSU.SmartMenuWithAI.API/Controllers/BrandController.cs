using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.API.Validations;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using FSU.SmartMenuWithAI.BussinessObject.Common.Constants;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Brand;
using SmartMenu.Services;

namespace FSU.SmartMenuWithAI.API.Controllers
{
    //[ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IS3Service _s3Service;
        private readonly AddBrandValidation _addBrandValidation;
        private readonly ImageFileValidator _imageFileValidator;

        public BrandController(IBrandService brandService, IS3Service s3Service)
        {
            _brandService = brandService;
            _s3Service = s3Service;
            _addBrandValidation = new AddBrandValidation();
            _imageFileValidator = new ImageFileValidator();
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPost(APIRoutes.Brand.Add, Name = "AddBrandAsync")]
        public async Task<IActionResult> AddAsync(CreateBrandDTO reqObj)
        {
            try
            {
                var validation = await _addBrandValidation.ValidateAsync(reqObj);
                if (!validation.IsValid)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Điền đầy đủ và hợp lệ thông tin",
                        Data = null,
                        IsSuccess = false
                    });
                }
                var validationImg = await _imageFileValidator.ValidateAsync(reqObj.Image);
                if (!validationImg.IsValid)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "File không phải là hình ảnh hợp lệ",
                        Data = null,
                        IsSuccess = false
                    });
                }
                var existBrand = await _brandService.GetByNameAsync(reqObj.BrandName);
                if (existBrand != null)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Tên thương hiệu đã tồn tại.",
                        Data = null,
                        IsSuccess = false
                    });
                }

                string imageUrl = null!;
                string imageName = null!;
                if (reqObj.Image != null)
                {
                    // Upload the image to S3 and get the URL
                    await _s3Service.UploadItemAsync(reqObj.Image, "brands");
                    imageName = reqObj.Image.FileName;
                    imageUrl = _s3Service.GetPreSignedURL(imageName, "brands");
                }
                var brandAdd = await _brandService.Insert(reqObj.BrandName, reqObj.UserId, imageUrl, imageName);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tạo brand mới thành công",
                    Data = brandAdd,
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

        //[Authorize(Roles = $"{UserRoles.Admin},{UserRoles.BrandManager}")]
        [HttpDelete(APIRoutes.Brand.Delete, Name = "DeleteBrandAsync")]
        public async Task<IActionResult> DeleteAsynce([FromQuery] int id)
        {
            try
            {
                var result = await _brandService.Delete(id);
                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "không tìm thấy thương hiệu",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "xoá thương hiệu thành công",
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
        [HttpPut(APIRoutes.Brand.Update, Name = "UpdatebrandAsync")]
        public async Task<IActionResult> UpdateUserAsync(int id, UpdateBrandDTO reqObj)
        {
            try
            {
                var brandToUpdate = await _brandService.GetByID(id);
                if (brandToUpdate == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy người dùng",
                        Data = null,
                        IsSuccess = false
                    });
                }
                if (reqObj.BrandName != brandToUpdate.BrandName)
                {

                    var existNameBrand = await _brandService.GetByNameAsync(reqObj.BrandName);
                    if (existNameBrand != null)
                    {
                        return BadRequest(new BaseResponse
                        {
                            StatusCode = StatusCodes.Status400BadRequest,
                            Message = "Tên thương hiệu đã tồn tại.",
                            Data = null,
                            IsSuccess = false
                        });
                    }
                }

                string imageUrl = null!;
                string imageName = null!;
                if (reqObj.Image != null)
                {
                    var validationImg = await _imageFileValidator.ValidateAsync(reqObj.Image);
                    if (!validationImg.IsValid)
                    {
                        return BadRequest(new BaseResponse
                        {
                            StatusCode = StatusCodes.Status400BadRequest,
                            Message = "File không phải là hình ảnh hợp lệ",
                            Data = null,
                            IsSuccess = false
                        });
                    }
                    // Upload the image to S3 and get the URL
                    await _s3Service.UploadItemAsync(reqObj.Image, "brands");
                    imageName = reqObj.Image.FileName;
                    imageUrl = _s3Service.GetPreSignedURL(imageName, "brands");
                }

                var result = await _brandService.Update(id, reqObj.BrandName, imageUrl, imageName);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Cập nhật người dùng thành công",
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
    }
}
