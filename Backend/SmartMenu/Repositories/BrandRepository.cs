using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Common.Enums;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;

namespace SmartMenu.Repositories
{
    public class BrandRepository : GenericRepository<Brand, BrandDto>, IBrandRepository
    {
        private readonly SmartMenuContext _context;
        private readonly IMapper _mapper;

        public BrandRepository(SmartMenuContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<BrandDto> UpdateAsync(int id, string brandName, string url, string imgName)
        {
            var entity = await _context.Brands.FindAsync(id);
            if (entity == null)
            {
                return default(BrandDto);
            }
            else 
            {
                entity.BrandName = brandName;
                entity.ImageUrl = url;
                entity.ImageName = imgName;
                await _context.SaveChangesAsync();
                return _mapper.Map<BrandDto>(entity);
            }
        }
    }
}
