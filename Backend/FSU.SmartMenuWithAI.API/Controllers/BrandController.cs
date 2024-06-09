using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.API.Validations;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Services;
using Microsoft.AspNetCore.Mvc;
using FSU.SmartMenuWithAI.API.Common.Constants;
using FSU.SmartMenuWithAI.API.Payloads.Request.Brand;
using Microsoft.EntityFrameworkCore;

namespace FSU.SmartMenuWithAI.API.Controllers
{
    //[ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandService _brandService;
        private readonly IS3Service _s3Service;
        private readonly ImageFileValidator _imageFileValidator;

        public BrandController(IBrandService brandService, IS3Service s3Service)
        {
            _brandService = brandService;
            _s3Service = s3Service;
            _imageFileValidator = new ImageFileValidator();
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPost(APIRoutes.Brand.Add, Name = "AddBrandAsync")]
        public async Task<IActionResult> AddAsync([FromForm] CreateBrandRequest reqObj)
        {
            try
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

                string imageUrl = null!;
                string imageName = null!;
                if (reqObj.Image != null)
                {
                    // Upload the image to S3 and get the URL
                    await _s3Service.UploadItemAsync(reqObj.Image, reqObj.Image.FileName + reqObj.BrandName, FolderRootImg.Brand);
                    imageName = reqObj.Image.FileName + reqObj.BrandName;
                    imageUrl = _s3Service.GetPreSignedURL(imageName, FolderRootImg.Brand);
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
            catch (DbUpdateException ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Tên thương hiệu đã tồn tại",
                    Data = null,
                    IsSuccess = false
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
        public async Task<IActionResult> UpdateUserAsync(int id, UpdateBrandRequest reqObj)
        {
            try
            {
                var existBrand = await _brandService.GetByID(id);
                if(existBrand == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy thương hiệu.",
                        Data = null,
                        IsSuccess = false
                    });
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
                    await _s3Service.UploadItemAsync(reqObj.Image, reqObj.Image.FileName + existBrand.BrandName, FolderRootImg.Brand);
                    imageName = reqObj.Image.FileName + existBrand.BrandName;
                    imageUrl = _s3Service.GetPreSignedURL(imageName, FolderRootImg.Brand);
                }

                var result = await _brandService.Update(id, reqObj.BrandName, imageUrl, imageName);
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
