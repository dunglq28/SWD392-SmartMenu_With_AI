﻿using AutoMapper;
using FSU.SmartMenuWithAI.BussinessObject.Common.Enums;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Pagination;
using FSU.SmartMenuWithAI.BussinessObject.DTOs.Store;
using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using FSU.SmartMenuWithAI.BussinessObject.Utils;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.ISerivice;
using System.Linq.Expressions;

namespace FSU.SmartMenuWithAI.Service.Services
{
    public class StoreService : IStoreService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public StoreService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }


        public async Task<bool> Delete(int id)
        {
            var deleteStore = await _unitOfWork.StoreRepository.GetByID(id);
            if (deleteStore == null)
            {
                return false;
            }
            deleteStore.Status = (int)Status.Deleted;

            _unitOfWork.StoreRepository.Update(deleteStore);
            var result = await _unitOfWork.SaveAsync() > 0 ? true : false;
            return result;

        }

        public async Task<PageEntity<StoreDTO>?> GetAllAsync(string? searchKey, int brandID, int? pageIndex = null, int? pageSize = null)
        {
            Expression<Func<Store, bool>> filter = searchKey != null ? x => x.Address.Contains(searchKey) && x.BrandId == brandID : x => x.BrandId == brandID;
            Func<IQueryable<Store>, IOrderedQueryable<Store>> orderBy = q => q.OrderBy(x => x.StoreId);
            string includeProperties = "Brand,User";

            var entities = await _unitOfWork.StoreRepository
                .Get(filter: filter, orderBy: orderBy, includeProperties: includeProperties, pageIndex: pageIndex, pageSize: pageSize);

            var pagin = new PageEntity<StoreDTO>();
            pagin.List = _mapper.Map<IEnumerable<StoreDTO>>(entities).ToList();
            pagin.TotalRecord = await _unitOfWork.StoreRepository.Count();
            pagin.TotalPage = PaginHelper.PageCount(pagin.TotalRecord, pageSize!.Value);
            return pagin;
        }

        public async Task<StoreDTO?> GetAsync(int id)
        {
            var store = await _unitOfWork.StoreRepository.GetByID(id);
            var mapDTO = _mapper.Map<StoreDTO>(store);

            return mapDTO;
        }

        public async Task<StoreDTO> Insert(AddStoreDTO entity)
        {
            var store = new Store();
            store.StoreCode = Guid.NewGuid().ToString();
            store.Address = entity.Address;
            store.UserId = entity.UserId;
            store.UpdateDate = DateOnly.FromDateTime(DateTime.Now);
            store.CreateDate = DateOnly.FromDateTime(DateTime.Now);
            store.IsActive = true;
            store.City = entity.City;
            store.Status = (int)Status.Exist;
            store.BrandId = entity.BrandId;

            await _unitOfWork.StoreRepository.Insert(store);
            if (await _unitOfWork.SaveAsync() < 1)
            {
                return null!;
            }
            var mapDTO = _mapper.Map<StoreDTO>(store);
            return mapDTO;
        }

        public async Task<StoreDTO> UpdateAsync(int id, UpdateStoreDTO entityToUpdate)
        {
            var store = await _unitOfWork.StoreRepository.GetByID(id);
            if (store == null)
            {
                return default(StoreDTO)!;
            }
            store.IsActive = entityToUpdate.IsActive;
            store.Address = entityToUpdate.Address;
            store.City = entityToUpdate.City;
            store.UpdateDate = DateOnly.FromDateTime(DateTime.Now);

            _unitOfWork.StoreRepository.Update(store);
            await _unitOfWork.SaveAsync();
            var mapDTO = _mapper.Map<StoreDTO>(store);
            return mapDTO;
        }
    }
}
