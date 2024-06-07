using FluentValidation;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Store;

namespace FSU.SmartMenuWithAI.API.Validations
{
    public class AddStoreValidation : AbstractValidator<AddStoreDTO>
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

    public class updateStoreValidation : AbstractValidator<UpdateStoreDTO>
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
