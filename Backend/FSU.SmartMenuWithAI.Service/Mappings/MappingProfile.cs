using AutoMapper;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.AppUser;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Brand;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Category;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Menu;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Product;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Store;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;

namespace FSU.SmartMenuWithAI.BussinessObject.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapping classes
            CreateMap<AppUser, AppUserDTO>().ReverseMap();
            CreateMap<Menu, CategoryDTO>().ReverseMap();
            CreateMap<Store, StoreDTO>().ReverseMap();
            CreateMap<Menu, MenuDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<Brand, BrandDTO>().ReverseMap();
        }
    }
}
