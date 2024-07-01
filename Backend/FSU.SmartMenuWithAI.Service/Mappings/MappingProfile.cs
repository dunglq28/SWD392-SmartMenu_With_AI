using AutoMapper;
using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Service.Models;
using FSU.SmartMenuWithAI.Service.Models.MenuList;
using FSU.SmartMenuWithAI.Service.Models.Token;
using FSU.SmartMenuWithAI.Service.Models.ViewModel;
using Attribute = FSU.SmartMenuWithAI.Repository.Entities.Attribute;


namespace FSU.SmartMenuWithAI.Service.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapping classes
            // user
            CreateMap<AppUser, AppUserDTO>().ReverseMap();
            CreateMap<Token, TokenDto>().ReverseMap();
            CreateMap<RefreshToken, RefreshTokenDTO>().ReverseMap();
            // menu
            CreateMap<Menu, MenuDTO>().ReverseMap();
            // store
            CreateMap<Store, StoreDTO>().ReverseMap();
            // brand
            CreateMap<Brand, BrandDTO>().ReverseMap();
            // menu
            CreateMap<Menu, MenuDTO>().ReverseMap();
            // category
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<Category, CategoryViewModel>().ReverseMap();
            // product
            CreateMap<Product, ProductDTO>()
                .ForMember(dest => dest.CategoryName, opt => opt.MapFrom(src => src.Category.CategoryName))
                .ReverseMap();
            // attribute
            CreateMap<Attribute, AttributeDTO>().ReverseMap();
            CreateMap<GroupAttribute, GroupAttributeDTO>().ReverseMap();
            // menu list
            CreateMap<MenuList, MenuListDTO>().ReverseMap();
            CreateMap<MenuList, CreateMenuListDTO>().ReverseMap();
            // listPosition
            CreateMap<ListPosition, ListPositionDTO>().ReverseMap();

        }
    }
}
