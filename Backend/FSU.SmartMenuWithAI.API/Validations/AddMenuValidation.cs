using FluentValidation;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Menu;

namespace FSU.SmartMenuWithAI.API.Validations
{
    public class AddMenuValidation : AbstractValidator<AddMenuDTO>
    {
        public AddMenuValidation()
        {
            RuleFor(x => x.IsActive)
                .NotNull()
                .WithMessage("Trạng thái chưa chính xác");

            RuleFor(x => x.BrandId)
                .NotNull()
                .WithMessage("Brand ID chưa chính xác");

        }
    }
}
