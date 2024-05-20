using AutoMapper;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using System.Security.Claims;

namespace SmartMenu.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapping classes
            CreateMap<Brand, BrandDto>().ReverseMap();
        }
    }
}
