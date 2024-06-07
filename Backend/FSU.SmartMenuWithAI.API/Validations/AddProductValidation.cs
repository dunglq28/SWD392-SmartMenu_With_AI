using FluentValidation;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Product;
using System.Data;

namespace FSU.SmartMenuWithAI.API.Validations
{
    public class AddProductValidation : AbstractValidator<AddProductDTO>
    {
        public AddProductValidation()
        {
            ImageFileValidator imageValidation = new ImageFileValidator();
            VideoValidator videoValidation = new VideoValidator();
            RuleFor(x => x.ProductName)
                .NotNull().NotEmpty()
                .MaximumLength(50)
                .WithMessage("tên sản phẩm phải từ 1-50 kí tự");
            RuleFor(x => x.Description)
                .NotEmpty().NotEmpty()
                .WithMessage("Mô tả sản phẩm phải từ 1-255 kí tự");
            RuleFor(x => x.BrandId)
                .NotNull().NotEmpty()
                .WithMessage("Chưa có thương hiệu");
            RuleFor(x => x.CategoryId)
                .NotNull().NotEmpty()
                .WithMessage("Chưa có phân loại");
            RuleFor( x => x.Image).SetValidator(imageValidation);
            RuleFor(x => x.SpotlightVideo).SetValidator(videoValidation);
        }

    }
}
