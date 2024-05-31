using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Common.Enums;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;

namespace SmartMenu.Repositories
{
    public class CategoryRepository : GenericRepository<Category, CategoryDTo>, ICategoryRepository
    {
        private readonly SmartMenuContext _context;
        private readonly IMapper _mapper;


        public CategoryRepository( SmartMenuContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<CategoryDTo> AddAsync(CategoryDTo reqObj)
        {
            var category = new Category();
            category.CategoryCode = Guid.NewGuid().ToString();
            category.CategoryName = reqObj.CategoryName;
            category.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
            category.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            category.Status = reqObj.Status;
            category.BrandId = reqObj.BrandId;

             await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return _mapper.Map<CategoryDTo>(category);
        }

        public async Task<CategoryDTo?> UpdateAsync(int id ,CategoryDTo reqObj)
        {
            var entity = await _context.Categories.FindAsync(id);
            if (entity == null)
            {
                return default(CategoryDTo);
            }
            entity.CategoryName = reqObj.CategoryName;
            entity.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
            entity.Status = reqObj.Status;
            await _context.SaveChangesAsync();
            return _mapper.Map<CategoryDTo>(entity);
        }

        public async Task<IEnumerable<CategoryDTo>?> GetAllAsync(string searchKey, int brandID)
        {
            var entities = await _context.Categories.Where(x => x.BrandId == brandID ).ToListAsync();
            if (!string.IsNullOrEmpty(searchKey))
            {
                entities = entities.Where(x => x.CategoryName.Contains(searchKey)).OrderBy(x => x.CategoryId).ToList();
            }

            return _mapper.Map<IEnumerable<CategoryDTo>>(entities);
        }

        public async Task<CategoryDTo?> GetAsync(int id, int brandID)
        {
            var entities = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == id && x.BrandId == brandID);
            return _mapper.Map<CategoryDTo>(entities);
        }
    }
}
