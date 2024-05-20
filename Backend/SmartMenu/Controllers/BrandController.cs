using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Entities;
using SmartMenu.Interfaces;
using SmartMenu.Payloads;
using SmartMenu.Payloads.Responses;
using SmartMenu.Repositories;
using SmartMenu.Services;

namespace SmartMenu.Controllers
{
    public class BrandController : ControllerBase
    {

        private readonly IBrandRepository _brandRepository;
        private readonly IS3Service _s3Service;

        public BrandController(IBrandRepository brandRepository, IS3Service s3Service)
        {
            _brandRepository = brandRepository;
            _s3Service = s3Service;
        }

        [HttpGet(APIRoutes.Brand.GetAll, Name = "GetBrandsAsync")]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Successful!",
                    Data = await _brandRepository.GetAllAsync(),
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
                var url = await _s3Service.GetPreSignedURL(fileName);
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Successfully generated pre-signed URL.",
                    Data = url,
                    IsSuccess = true
                });
            }
            catch (Exception ex)
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





    }
}
