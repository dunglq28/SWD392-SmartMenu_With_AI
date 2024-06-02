using SmartMenu.Entities;
using SmartMenu.Interfaces;
using System;

namespace SmartMenu.Repositories
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly SmartMenuContext _dbContext;
        private readonly IAccountRepository _accountRepository;
        private readonly IBrandRepository _brandRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMenuRepository _menuRepository;
        public IStoreRepository _storeRepository;

        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public UnitOfWork(SmartMenuContext dbContext,
            IAccountRepository accountRepository,
            IBrandRepository brandRepository,
            ICategoryRepository categoryRepository,
            IStoreRepository storeRepository,
            IMenuRepository menuRepository,
            IRefreshTokenRepository refreshTokenRepository)
        {
            _dbContext = dbContext;
            _accountRepository = accountRepository;
            _brandRepository = brandRepository;
            _categoryRepository = categoryRepository;
            _storeRepository = storeRepository;
            _menuRepository = menuRepository;
            _refreshTokenRepository = refreshTokenRepository;
        }
        public IAccountRepository AccountRepository => _accountRepository;

        public IBrandRepository BrandRepository => _brandRepository;
        public IStoreRepository StoreRepository => _storeRepository;
        public ICategoryRepository CategoryRepository => _categoryRepository;
        public IMenuRepository MenuRepository => _menuRepository;
        public IRefreshTokenRepository RefreshTokenRepository =>  _refreshTokenRepository;

        public async Task<int> SaveChangeAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}
