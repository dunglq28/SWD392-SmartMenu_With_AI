﻿using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.API.Validations;
using FSU.SmartMenuWithAI.Service.ISerivice;
using FSU.SmartMenuWithAI.Service.Services;
using Microsoft.AspNetCore.Mvc;
using FSU.SmartMenuWithAI.API.Common.Constants;
using FSU.SmartMenuWithAI.API.Payloads.Request.Brand;
using Microsoft.EntityFrameworkCore;
using FSU.SmartMenuWithAI.Service.Models;

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
        [HttpPost(APIRoutes.Brand.Add, Name = "add-brand-async")]
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
                    await _s3Service.UploadItemAsync(reqObj.Image, reqObj.BrandName+reqObj.Image.FileName, FolderRootImg.Brand);
                    imageName = reqObj.BrandName + reqObj.Image.FileName;
                    imageUrl = _s3Service.GetPreSignedURL(imageName, FolderRootImg.Brand);
                }
                var brandAdd = await _brandService.Insert(reqObj.BrandName, Int32.Parse(reqObj.UserId), imageUrl, imageName);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tạo thương hiệu mới thành công",
                    Data = brandAdd,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Lỗi khi tạo mới thương hiệu!" +ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        //[Authorize(Roles = $"{UserRoles.Admin},{UserRoles.BrandManager}")]
        [HttpDelete(APIRoutes.Brand.Delete, Name = "delete-brand-async")]
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
        [HttpPut(APIRoutes.Brand.Update, Name = "update-brand-async")]
        public async Task<IActionResult> UpdateUserAsync([FromForm] int id, [FromForm] UpdateBrandRequest reqObj)
        {
            try
            {
                var existBrand = await _brandService.GetByID(id);
                if (existBrand == null)
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
                    await _s3Service.UploadItemAsync(reqObj.Image, reqObj.BrandName + reqObj.Image.FileName, FolderRootImg.Brand);
                    imageName = reqObj.BrandName + reqObj.Image.FileName;
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
        //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.Brand.GetAll, Name = "get-brands-async")]
        public async Task<IActionResult> GetAllAsync([FromQuery(Name = "search-key")] string? searchKey
            , [FromQuery(Name = "page-number")] int pageNumber = Page.DefaultPageIndex
            , [FromQuery(Name = "page-size")] int PageSize = Page.DefaultPageSize)
        {
            try
            {
                var allBrands = await _brandService.GetBrands(searchKey!, pageIndex: pageNumber, pageSize: PageSize);

                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tải dữ liệu thành công",
                    Data = allBrands,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Tải dữ liệu thất bại!" +ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }
        //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.Brand.GetByID, Name = "GetBrandByID")]
        public async Task<IActionResult> GetAsync([FromQuery] int id)
        {
            try
            {
                var user = await _brandService.GetByID(id);

                if (user == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy thương hiệu",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tìm thành công",
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
        //[Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.Brand.GetAllName, Name = "GetAllBrandName")]
        public async Task<IActionResult> GetAllBrandNameAsync()
        {
            try
            {
                var listName = await _brandService.GetAllBrandName();

                if (listName == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy bất kì thương hiệu nào",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tìm thành công",
                    Data = listName,
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

        //[Authorize(Roles = UserRoles)]
        [HttpGet(APIRoutes.Brand.GetByUserID, Name = "GetBrandByUserId")]
        public async Task<IActionResult> GetBrandByUserIdAsync([FromQuery(Name = "user-id")] int userId)
        {
            try
            {
                var brands = await _brandService.GetBrandByUserID(userId);

                if (brands == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy thương hiệu cho người dùng này",
                        Data = null,
                        IsSuccess = false
                    });
                }

                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Tìm thành công",
                    Data = brands,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Lỗi khi tìm kiếm!" + ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
        }

    }
}
