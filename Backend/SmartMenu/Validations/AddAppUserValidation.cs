using FluentValidation;
using SmartMenu.Payloads.Requests;
using SmartMenu.Utils;

namespace SmartMenu.Validations
{
    public class AddAppUserValidation : AbstractValidator<AddAppUserRequest>
    {
        public AddAppUserValidation()
        {
            RuleFor(c => c.UserName)
            .NotEmpty().WithMessage("Username is required.")
            .MaximumLength(50).WithMessage("Username must not exceed 50 characters.");

            RuleFor(c => c.Password)
                .NotEmpty().WithMessage("Password is required.")
                .MaximumLength(255).WithMessage("Password must not exceed 255 characters.");

            RuleFor(c => c.RoleId)
                .NotEmpty().WithMessage("Role is required.")
                .Must(NumberHelper.IsValidInteger).WithMessage("Role ID must be a valid integer.");

            RuleFor(c => c.IsActive)
                .NotEmpty().WithMessage("Active status is required.");
        }
    }
}
