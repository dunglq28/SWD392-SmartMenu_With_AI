using AutoMapper;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Brand;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using System.Security.Claims;

namespace SmartMenu.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapping classes
            CreateMap<AppUser, AppUserDTO>().ReverseMap();
            CreateMap<Brand, BrandDTO>().ReverseMap();
        }
    }
}
