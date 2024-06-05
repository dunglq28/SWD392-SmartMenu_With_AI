using FluentValidation;

namespace FSU.SmartMenuWithAI.API.Validations
{
    public class ImageFileValidator : AbstractValidator<IFormFile>
    {
        public ImageFileValidator()
        {
            RuleFor(x => x.ContentType).NotNull().Must(x => x.Equals("image/jpeg") || x.Equals("image/jpg") || x.Equals("image/png"))
                .WithMessage("File type '.jpeg / .jpg / .png' are required");
        }
    }
}
