//using FluentValidation;
//using SmartMenu.Payloads.Requests;
//using SmartMenu.Payloads.Requests.BrandRequest;

//namespace FSU.SmartMenuWithAI.API.Validations
//{
//    public class AddBrandValidation : AbstractValidator<AddBrandRequest>
//    {
//        public AddBrandValidation() 
//        {
//            RuleFor(c => c.BrandName)
//           .NotEmpty().WithMessage("Brand name is required.")
//           .MaximumLength(50).WithMessage("Brand name must not exceed 50 characters.");

//            RuleFor(c => c.UserId)
//            .NotEmpty().WithMessage("UserId is required.")
//            .Must(NumberHelper.IsValidInteger).WithMessage("UserId must be a valid integer.");

//        }
//    }
//}
