using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Common.Enums;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;
using SmartMenu.Payloads.Requests;

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

        public async Task<CategoryDTo> AddAsync(AddCagetoryRequest reqObj)
        {
            var category = new Category();
            category.CategoryCode = Guid.NewGuid().ToString();
            category.CategoryName = reqObj.CategoryName;
            category.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
            category.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            category.Status = (int) Status.Exist ;
            category.BrandId = reqObj.BrandId;

             await _context.Categories.AddAsync(category);
            await _context.SaveChangesAsync();

            return _mapper.Map<CategoryDTo>(category);
        }

        public async Task<CategoryDTo?> UpdateAsync(int id ,string cagetoryName)
        {
            var entity = await _context.Categories.FindAsync(id);
            if (entity == null)
            {
                return default(CategoryDTo);
            }
            entity.CategoryName = cagetoryName;
            entity.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
            await _context.SaveChangesAsync();
            return _mapper.Map<CategoryDTo>(entity);
        }

        public async Task<IEnumerable<CategoryDTo>?> GetAllAsync(string searchKey, int brandID)
        {
            var entities = new List<Category>();
            if (!string.IsNullOrEmpty(searchKey))
            {
                entities = await _context.Categories.Where(x => x.CategoryName.ToLower().Contains(searchKey.ToLower())).OrderBy(x => x.CategoryId).ToListAsync();
            }
            else
            {
                entities = await _context.Categories.Where(x => x.BrandId == brandID).ToListAsync();
            }

            return _mapper.Map<IEnumerable<CategoryDTo>>(entities);
        }

        public async Task<CategoryDTo?> GetAsync(int id)
        {
            var entities = await _context.Categories.FirstOrDefaultAsync(x => x.CategoryId == id);
            return _mapper.Map<CategoryDTo>(entities);
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.Categories.FindAsync(id);
            if (entity == null)
            {
                return false;
            }
            entity.Status = (int)Status.Deleted;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
