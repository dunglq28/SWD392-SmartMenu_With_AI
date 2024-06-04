using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Common.Constants;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;
using SmartMenu.Payloads;
using SmartMenu.Payloads.Requests;
using SmartMenu.Payloads.Requests.BrandRequest;
using SmartMenu.Payloads.Responses;
using SmartMenu.Repositories;
using SmartMenu.Services;
using SmartMenu.Validations;

namespace SmartMenu.Controllers
{
    public class BrandController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IS3Service _s3Service;
        private readonly AddBrandValidation _addBrandValidation;


        public BrandController(IUnitOfWork unitOfWork, IS3Service s3Service)
        {
            _unitOfWork = unitOfWork;
            _s3Service = s3Service;
            _addBrandValidation = new AddBrandValidation();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet(APIRoutes.Brand.GetAll, Name = "GetBrandsAsync")]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Successful!",
                    Data = await _unitOfWork.BrandRepository.GetAllAsync(),
                    IsSuccess = true
                });
            }
            catch
            {
                return NotFound(new BaseResponse
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = "Not found any brand!",
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        [HttpPost(APIRoutes.Brand.UploadImage, Name = "UploadImageTest")]
        public async Task<IActionResult> UploadImageTest(IFormFile image)
        {
            try
            {
                var uploadResult = await _s3Service.UploadItemAsync(image);

                if (uploadResult.HttpStatusCode == System.Net.HttpStatusCode.OK)
                {
                    return Ok(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status200OK,
                        Message = "Upload Image Successful!",
                        Data = null,
                        IsSuccess = true
                    });
                }
                else
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Upload failed!",
                        Data = null,
                        IsSuccess = true
                    });
                }

            }
            catch
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Some thing went wrong!",
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        [HttpGet(APIRoutes.Brand.GetImage, Name = "GetImageTest")]
        public async Task<IActionResult> GetImageTest(string fileName)
        {
            try
            {
                var url = _s3Service.GetPreSignedURL(fileName);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Successfully generated pre-signed URL.",
                    Data = url,
                    IsSuccess = true
                });
            }
            catch (Exception)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = "Some thing went wrong!",
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost(APIRoutes.Brand.Add, Name = "AddBrandAsync")]
        public async Task<IActionResult> AddAsync(AddBrandRequest reqObj)
        {
            try
            {
                var validation = await _addBrandValidation.ValidateAsync(reqObj);
                if (!validation.IsValid)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Nhập đầy đủ và hợp lệ các trường",
                        Data = null,
                        IsSuccess = false
                    });
                }
                if (reqObj.image == null || reqObj.image.Length == 0)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "Cần có hình ảnh",
                        Data = null,
                        IsSuccess = false
                    });
                }

                // Kiểm tra phần mở rộng của tệp tin
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif" };
                var extension = Path.GetExtension(reqObj.image.FileName).ToLowerInvariant();
                if (!allowedExtensions.Contains(extension))
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "File không phải là hình ảnh hợp lệ",
                        Data = null,
                        IsSuccess = false
                    });
                }

                string imageUrl = null;
                string imageName = null;

                if (reqObj.image != null)
                {
                    // Upload the image to S3 and get the URL
                    var result = await _s3Service.UploadItemAsync(reqObj.image);
                    imageName = reqObj.image.FileName;
                    imageUrl = _s3Service.GetPreSignedURL(imageName);
                }
                var BrandAdd = await _unitOfWork.BrandRepository.AddAsync(reqObj.BrandName, reqObj.UserId, imageUrl, imageName);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "New brand successfully",
                    Data = BrandAdd,
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
        [HttpPut(APIRoutes.Brand.Update, Name = "UpdateAsync")]
        public async Task<IActionResult> UpdateAsync(int id, IFormFile image, string brandName, int status)
        {
            try
            {
                string imageUrl = null;
                string imageName = null;

                if (image != null)
                {
                    // Upload the image to S3 and get the URL
                    var result = await _s3Service.UploadItemAsync(image);
                    imageName = image.FileName;
                    imageUrl = _s3Service.GetPreSignedURL(imageName);
                }
                var updatedBrand = await _unitOfWork.BrandRepository.UpdateAsync(id, brandName, imageUrl, imageName, status);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Update Successful!",
                    Data = updatedBrand,
                    IsSuccess = true
                });
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(new BaseResponse
                {
                    StatusCode = StatusCodes.Status404NotFound,
                    Message = ex.Message,
                    Data = null,
                    IsSuccess = false
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = $"Update failed! Error: {ex.Message}",
                    Data = null,
                    IsSuccess = false
                });
            }
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete(APIRoutes.Brand.Delete, Name = "DeleteBrandAsync")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            try
            {
                // Kiểm tra xem thương hiệu có tồn tại không
                var existingBrand = await _unitOfWork.BrandRepository.GetByIdAsync(id);
                if (existingBrand == null)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Brand not found",
                        Data = null,
                        IsSuccess = false
                    });
                }

                // Cập nhật trạng thái của thương hiệu thành 0 để xóa
                existingBrand.Status = 0;
                await _unitOfWork.BrandRepository.UpdateAsync(id, existingBrand);

                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Brand deleted successfully",
                    Data = null,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new BaseResponse
                {
                    StatusCode = StatusCodes.Status400BadRequest,
                    Message = $"Delete failed! Error: {ex.Message}",
                    Data = null,
                    IsSuccess = false
                });
            }
        }

    }
}
