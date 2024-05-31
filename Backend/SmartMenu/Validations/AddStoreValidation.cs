using FluentValidation;
using SmartMenu.DTOs;
using SmartMenu.Payloads.Requests;
using SmartMenu.Utils;

namespace SmartMenu.Validations
{
    public class AddStoreValidation : AbstractValidator<AddStoreRequest>
    {
        public AddStoreValidation()
        {
            RuleFor(c => c.Address)
                .NotNull()
            .NotEmpty().WithMessage("Username is required.")
            .MaximumLength(50).WithMessage("Username must not exceed 50 characters.");


            RuleFor(c => c.City)
                .NotEmpty().WithMessage("City is required.");

            RuleFor(c => c.UserId)
              .NotNull()
              .NotEmpty()
              .GreaterThan(0)
              .WithMessage("User ID is required");

            RuleFor(c => c.BrandId)
                .NotNull()
                .NotEmpty()
                .GreaterThan(0)
                .WithMessage("Brand ID is required");
        }
      
    }

    public class updateStoreValidation : AbstractValidator<UpdateStoreRequest>
    {
        public updateStoreValidation()
        {
            RuleFor(c => c.Address)
                .NotNull()
            .NotEmpty().WithMessage("Username is required.")
            .MaximumLength(50).WithMessage("Username must not exceed 50 characters.");

            RuleFor(c => c.IsActive)
                .NotNull()
                .WithMessage("Value is required.");

            RuleFor(c => c.City)
                .NotNull()
                .NotEmpty().WithMessage("City is required.");

        }

    }
}
