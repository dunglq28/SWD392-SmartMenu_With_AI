using AutoMapper;
using Microsoft.EntityFrameworkCore;
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

    }
}
