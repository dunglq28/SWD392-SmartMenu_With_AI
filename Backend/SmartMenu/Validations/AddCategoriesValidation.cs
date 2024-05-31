using FluentValidation;
using SmartMenu.DTOs;
using SmartMenu.Payloads.Requests;
using SmartMenu.Utils;

namespace SmartMenu.Validations
{
    public class AddCategoriesValidation : AbstractValidator<AddCagetoryRequest>
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
