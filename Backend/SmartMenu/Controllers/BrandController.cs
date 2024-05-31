using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Common.Constants;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;
using SmartMenu.Payloads;
using SmartMenu.Payloads.Requests.BrandRequest;
using SmartMenu.Payloads.Responses;
using SmartMenu.Repositories;
using SmartMenu.Services;

namespace SmartMenu.Controllers
{
    public class BrandController : ControllerBase
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IS3Service _s3Service;

        public BrandController(IUnitOfWork unitOfWork, IS3Service s3Service)
        {
            _unitOfWork = unitOfWork;
            _s3Service = s3Service;
        }

        //[Authorize(Roles = UserRoles.Admin)]
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

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPut(APIRoutes.Brand.Update, Name = "UpdateAsync")]
        public async Task<IActionResult> UpdateAsync(int id, IFormFile image, string brandName)
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
                var updatedBrand = await _unitOfWork.BrandRepository.UpdateAsync(id, brandName, imageUrl, imageName);
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

        //public override async Task<bool> DeleteEntity(int id)




    }
}
