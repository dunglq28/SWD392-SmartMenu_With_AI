using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Common.Enums;
using SmartMenu.DTOs;
using SmartMenu.Entities;
using SmartMenu.Interfaces;
using SmartMenu.Payloads.Requests;

namespace SmartMenu.Repositories
{
    public class StoreRepository : GenericRepository< Store, StoreDTo>, IStoreRepository
    {
        private readonly SmartMenuContext _context;
        private readonly IMapper _mapper;

        public StoreRepository(SmartMenuContext context, IMapper mapper) : base(context, mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<StoreDTo> AddAsync(AddStoreRequest reqObj)
        {
            var store = new Store();
            store.StoreCode = Guid.NewGuid().ToString();
            store.Address = reqObj.Address;
            store.UserId = reqObj.UserId;
            store.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
            store.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            store.IsActive = true;
            store.City = reqObj.City;
            store.Status = (int)Status.Exist;
            store.BrandId = reqObj.BrandId;

            await _context.Stores.AddAsync(store);
            await _context.SaveChangesAsync();

            return _mapper.Map<StoreDTo>(store);
        }

        public async Task<StoreDTo?> UpdateAsync(int id, UpdateStoreRequest reqObj)
        {
            var entity = await _context.Stores.FindAsync(id);
            if (entity == null)
            {
                return default(StoreDTo);
            }
            entity.IsActive = reqObj.IsActive;
            entity.Address = reqObj.Address;
            entity.City = reqObj.City;
            entity.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
            await _context.SaveChangesAsync();
            return _mapper.Map<StoreDTo>(entity);
        }

        public async Task<IEnumerable<StoreDTo>?> GetAllAsync(string searchKey, int brandID)
        {
            var entities = new List<StoreDTo>();
            if (!string.IsNullOrEmpty(searchKey))
            {
                entities = await _context.Stores
                    .Include(x => x.Brand)
                    .Where(x => x.BrandId == brandID && x.Address.ToLower().Contains(searchKey.ToLower()))
                    .Select(x => new StoreDTo
                    {
                        StoreId = x.StoreId,
                        StoreCode = x.StoreCode,
                        UserId = x.UserId,
                        CreateDate = x.CreateDate,
                        IsActive = x.IsActive,
                        UpdateDate = x.UpdateDate,
                        Status = x.Status,
                        Address = x.Address,
                        City = x.City,
                        BrandId = x.BrandId,
                        BrandName = x.Brand.BrandName
                    })
                    .OrderBy(x => x.StoreId)
                    .ToListAsync();
            }
            else
            {
                entities = await _context.Stores
                    .Include(x => x.Brand)
                    .Where(x => x.BrandId == brandID)
                    .Select(x => new StoreDTo
                    {
                        StoreId = x.StoreId,
                        StoreCode = x.StoreCode,
                        UserId = x.UserId,
                        CreateDate = x.CreateDate,
                        IsActive = x.IsActive,
                        UpdateDate = x.UpdateDate,
                        Status = x.Status,
                        Address = x.Address,
                        City = x.City,
                        BrandId = x.BrandId,
                        BrandName = x.Brand.BrandName
                    })
                    .OrderBy(x => x.StoreId)
                    .ToListAsync();
            }

            return entities;
        }

        public async Task<StoreDTo?> GetAsync(int id)
        {
            var entities = await _context.Stores.Select(x => new StoreDTo
            {
                StoreId = x.StoreId,
                StoreCode = x.StoreCode,
                UserId = x.UserId,
                CreateDate = x.CreateDate,
                IsActive = x.IsActive,
                UpdateDate = x.UpdateDate,
                Status = x.Status,
                Address = x.Address,
                City = x.City,
                BrandId = x.BrandId,
                BrandName = x.Brand.BrandName
            }).FirstOrDefaultAsync(x => x.StoreId == id);
            return _mapper.Map<StoreDTo>(entities);
        }

        public async Task<bool> Delete(int id)
        {
            var entity = await _context.Stores.FindAsync(id);
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
