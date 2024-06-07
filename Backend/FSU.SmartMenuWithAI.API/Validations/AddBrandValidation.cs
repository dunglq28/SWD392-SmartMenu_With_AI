using FluentValidation;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Brand;
using FSU.SmartMenuWithAI.BussinessObject.Utils;


namespace FSU.SmartMenuWithAI.API.Validations
{
    public class AddBrandValidation : AbstractValidator<CreateBrandDTO>
    {
        public AddBrandValidation()
        {
            RuleFor(b => b.BrandName)
           .NotEmpty().WithMessage("Brand name is required.")
           .MaximumLength(50).WithMessage("Brand name must not exceed 50 characters.");

            RuleFor(b => b.UserId)
            .NotEmpty().WithMessage("UserId is required.")
            .Must(NumberHelper.IsValidInteger).WithMessage("UserId must be a valid integer.");

            RuleFor(b => b.Image)
           .NotNull().WithMessage("Image is required.");
        }
    }
}
