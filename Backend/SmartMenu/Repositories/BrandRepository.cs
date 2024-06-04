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

        public async Task<BrandDto> AddAsync(string brandName, int userID, string imgUrl, string imgName)
        {
            var brand = new Brand();
            brand.BrandCode = Guid.NewGuid().ToString();
            brand.BrandName = brandName;
            brand.UserId = userID;
            brand.Status = 1;
            brand.ImageUrl = imgUrl;
            brand.ImageName = imgName;
            brand.CreateDate = DateOnly.FromDateTime(DateTime.Now);

            _context.Brands.Add(brand);
            await _context.SaveChangesAsync();

            return _mapper.Map<BrandDto>(brand);
        }

        public async Task<BrandDto> UpdateAsync(int id, string brandName, string url, string imgName, int status)
        {
            var entity = await _context.Brands.FindAsync(id);
            if (entity == null)
            {
                return null!;
            }
            else
            {
                if (brandName != null)
                {
                    entity.BrandName = brandName;
                }
                if (url != null && imgName != null)
                {
                    entity.ImageUrl = url;
                    entity.ImageName = imgName;
                }
                if (status != default(int))
                {
                    entity.Status = status;
                }
                await _context.SaveChangesAsync();
                return _mapper.Map<BrandDto>(entity);
            }
        }

        public async Task<BrandDto> GetByIdAsync(int id)
        {
            var brand = await _context.Brands.FindAsync(id);
            return _mapper.Map<BrandDto>(brand);
        }

        public async Task<BrandDto> GetByNameAsync(string name)
        {
            var brand = await _context.Brands.FirstOrDefaultAsync(b => b.BrandName == name);
            if (brand == null)
            {
                return null!;
            }
            return _mapper.Map<BrandDto>(brand);
        }
        public async Task<IEnumerable<BrandDto>> GetByUserIDAsync(int userID)
        {
            var brands = await _context.Brands.Where(b => b.UserId == userID).ToListAsync();
            if (brands == null || !brands.Any())
            {
                return Enumerable.Empty<BrandDto>();
            }
            return _mapper.Map<IEnumerable<BrandDto>>(brands);
        }
    }
}
