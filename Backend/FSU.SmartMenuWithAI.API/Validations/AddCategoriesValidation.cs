using FluentValidation;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Category;
using FSU.SmartMenuWithAI.BussinessObject.Utils;

namespace FSU.SmartMenuWithAI.API.Validations
{
    public class AddCategoriesValidation : AbstractValidator<AddCagetoryDTO>
    {
        public AddCategoriesValidation()
        {
            RuleFor(c => c.CategoryName)
            .NotEmpty().WithMessage("Category Name is required.")
            .MaximumLength(50).WithMessage("Username must not exceed 50 characters.");


            RuleFor(c => c.BrandId)
                .NotEmpty().WithMessage("BrandId is required.")
                .Must(NumberHelper.IsValidInteger).WithMessage("BrandId must be a valid integer.");
        }
    }
}
