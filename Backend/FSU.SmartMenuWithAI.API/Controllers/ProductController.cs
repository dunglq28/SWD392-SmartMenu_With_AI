using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.API.Payloads;
using FSU.SmartMenuWithAI.API.Validations;
using FSU.SmartMenuWithAI.Service.ISerivice;
using Microsoft.AspNetCore.Mvc;
using FSU.SmartMenuWithAI.API.Common.Constants;
using FSU.SmartMenuWithAI.API.Payloads.Request.Product;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Services;

namespace FSU.SmartMenuWithAI.API.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ImageFileValidator _imageFileValidator;
        private readonly IS3Service _s3Service;
        private readonly VideoValidator _videoValidation;

        public ProductController(IProductService productService, IS3Service s3Service)
        {
            _productService = productService;
            _imageFileValidator = new ImageFileValidator();
            _videoValidation = new VideoValidator();
            _s3Service = s3Service;
        }

        //[Authorize(Roles = UserRoles.Admin)]
        [HttpPost(APIRoutes.Product.Add, Name = "AddProductAsync")]
        public async Task<IActionResult> AddAsync([FromForm] AddProductRequest reqObj)
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
                var validationvideo = await _videoValidation.ValidateAsync(reqObj.SpotlightVideo);
                if (!validationImg.IsValid)
                {
                    return BadRequest(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status400BadRequest,
                        Message = "File không phải là video hợp lệ",
                        Data = null,
                        IsSuccess = false
                    });
                }

                var dto = new ProductDTO
                {
                    ProductName = reqObj.ProductName,
                    SpotlightVideoImageName = reqObj.SpotlightVideo.FileName + reqObj.BrandId,
                    SpotlightVideoImageUrl = _s3Service.GetPreSignedURL(reqObj.SpotlightVideo.FileName + reqObj.BrandId, FolderRootImg.Product),
                    ImageName = reqObj.Image.FileName + reqObj.BrandId,
                    ImageUrl = _s3Service.GetPreSignedURL(reqObj.Image.FileName + reqObj.BrandId, FolderRootImg.Product),
                    Description = reqObj.Description,
                    CategoryId = reqObj.CategoryId,
                    BrandId = reqObj.BrandId,
                };

                await _s3Service.UploadItemAsync(reqObj.SpotlightVideo, dto.SpotlightVideoImageName, FolderRootImg.Product);
                await _s3Service.UploadItemAsync(reqObj.Image, dto.ImageName, FolderRootImg.Product);

                var result = await _productService.Insert(dto);

                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Sản phẩm không tồn tại",
                        Data = null,
                        IsSuccess = false
                    });
                }
                return Ok(new BaseResponse
                {
                    StatusCode = StatusCodes.Status200OK,
                    Message = "Thêm sản phẩm thành công",
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
        [HttpDelete(APIRoutes.Product.Delete, Name = "DeleteProductAsync")]
        public async Task<IActionResult> DeleteAsynce([FromQuery] int id)
        {
            try
            {
                var result = await _productService.Delete(id);
                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Sản phẩm không tồn tại",
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
        [HttpPut(APIRoutes.Product.Update, Name = "UpdateProductAsync")]
        public async Task<IActionResult> UpdateUserAsync([FromQuery(Name = "product-id")] int id, [FromForm] UpdateProductRequest reqObj)
        {
            try
            {
                var existProduct = await _productService.GetAsync(id);
                if (existProduct == null )
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Không tìm thấy sản phẩm",
                        Data = null,
                        IsSuccess = false
                    });
                }
                var dto = new ProductDTO();
                dto.ProductName = reqObj.ProductName!;
                if (reqObj.SpotlightVideo != null)
                {

                    dto.SpotlightVideoImageName = reqObj.SpotlightVideo.FileName + existProduct.BrandId;
                    dto.SpotlightVideoImageUrl = _s3Service.GetPreSignedURL(reqObj.SpotlightVideo.FileName + existProduct.BrandId, FolderRootImg.Product);
                }
                if (reqObj.Image != null)
                {
                    dto.ImageName = reqObj.Image.FileName + existProduct.BrandId;
                    dto.ImageUrl = _s3Service.GetPreSignedURL(reqObj.Image.FileName + existProduct.BrandId, FolderRootImg.Product);
                }

                dto.Description = reqObj.Description;


                var result = await _productService.UpdateAsync(id, dto);

                if (!result)
                {
                    return NotFound(new BaseResponse
                    {
                        StatusCode = StatusCodes.Status404NotFound,
                        Message = "Cập nhật thất bại",
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
        [HttpGet(APIRoutes.Product.GetAll, Name = "GetProductAsync")]
        public async Task<IActionResult> GetAllAsync([FromQuery(Name = "search-key")] string? searchKey
            , [FromQuery(Name = "brand-id")] int brandID
            , [FromQuery(Name = "category-id")] int? categoryID
            , [FromQuery(Name = "page-number")] int pageNumber = Page.DefaultPageIndex
            , [FromQuery(Name = "page-size")] int PageSize = Page.DefaultPageSize)
        {
            try
            {
                var menus = await _productService.GetAllAsync(searchKey: searchKey, categoryID: categoryID, brandID: brandID, pageIndex: pageNumber, pageSize: PageSize);

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
        [HttpGet(APIRoutes.Product.GetByID, Name = "GetProductByID")]
        public async Task<IActionResult> GetAsync([FromQuery] int Id)
        {
            try
            {
                var user = await _productService.GetAsync(Id);

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
