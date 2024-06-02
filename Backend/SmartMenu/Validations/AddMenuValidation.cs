using FluentValidation;
using SmartMenu.Payloads.Requests;

namespace SmartMenu.Validations
{
    public class AddMenuValidation : AbstractValidator<AddMenuRequest>
    {
        public AddMenuValidation()
        {
            RuleFor(x => x.IsActive)
                .NotNull()
                . WithMessage("Trạng thái chưa chính xác");
               
            RuleFor(x => x.BrandId)
                .NotNull()
                .WithMessage("Brand ID chưa chính xác");

        }
    }
}
