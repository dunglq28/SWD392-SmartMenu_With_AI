using FluentValidation;
using SmartMenu.DTOs;
using SmartMenu.Utils;

namespace SmartMenu.Validations
{
    public class CategoriesValidation : AbstractValidator<CategoryDTo>
    {
        public CategoriesValidation()
        {
            RuleFor(c => c.CategoryName)
            .NotEmpty().WithMessage("Category Name is required.")
            .MaximumLength(50).WithMessage("Username must not exceed 50 characters.");

            RuleFor(c => c.Status)
                .NotEmpty().WithMessage("Status is required.")
                .Must(NumberHelper.IsValidInteger).WithMessage("Status must be a valid integer.");

            RuleFor(c => c.BrandId)
                .NotEmpty().WithMessage("BrandId is required.")
                .Must(NumberHelper.IsValidInteger).WithMessage("BrandId must be a valid integer.");
        }
    }
}
