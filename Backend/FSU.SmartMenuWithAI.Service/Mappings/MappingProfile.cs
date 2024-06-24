using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.Token;
using Attribute = FSU.SmartMenuWithAI.Repository.Entities.Attribute;


namespace FSU.SmartMenuWithAI.Service.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapping classes
            CreateMap<AppUser, AppUserDTO>().ReverseMap();
            CreateMap<Token, TokenDto>().ReverseMap();
            CreateMap<Menu, MenuDTO>().ReverseMap();
            CreateMap<Store, StoreDTO>().ReverseMap();
            CreateMap<Menu, MenuDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<Brand, BrandDTO>().ReverseMap();
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<ProductMenu, ProductMenuDTO>().ReverseMap();
            //CreateMap<ProductMenu, CreateProductMenuDTO>().ReverseMap();
            CreateMap<RefreshToken, RefreshTokenDTO>().ReverseMap();
            CreateMap<GroupAttribute, GroupAttributeDTO>().ReverseMap();
            CreateMap<Attribute, AttributeDTO>().ReverseMap();

        }
    }
}
