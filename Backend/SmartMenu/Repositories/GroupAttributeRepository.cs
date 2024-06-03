using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;

namespace SmartMenu.Repositories
{
    public class GroupAttributeRepository : GenericRepository<GroupAttribute, GroupAttributeDto>, IGroupAttributeRepository
    {
        private readonly SmartMenuContext _context;
        private readonly IMapper _mapper;
        public GroupAttributeRepository(SmartMenuContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GroupAttributeDto> AddAsync(string name)
        {
            if (await _context.GroupAttributes.AnyAsync(ga => ga.GroupAttributeName == name))
            {
                throw new InvalidOperationException("Tên thuộc tính đã tồn tại!");
            }

            var entity = new GroupAttribute
            {
                GroupAttributeName = name,
                CreateDate = DateOnly.FromDateTime(DateTime.Now)
            };

            await _context.GroupAttributes.AddAsync(entity);
            await _context.SaveChangesAsync();

            return _mapper.Map<GroupAttributeDto>(entity);
        }

        public async Task<GroupAttributeDto> GetByNameAsync(string name)
        {
            var entity = await _context.GroupAttributes.FirstOrDefaultAsync(ga => ga.GroupAttributeName == name);
            if (entity == null)
            {
                return null!;
            }

            return _mapper.Map<GroupAttributeDto>(entity);
        }
    }
}
