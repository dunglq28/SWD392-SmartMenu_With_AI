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
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public UnitOfWork(SmartMenuContext dbContext,
            IAccountRepository accountRepository,
            IBrandRepository brandRepository,
            ICategoryRepository categoryRepository,
            IRefreshTokenRepository refreshTokenRepository)
        {
            _dbContext = dbContext;
            _accountRepository = accountRepository;
            _brandRepository = brandRepository;
            _categoryRepository = categoryRepository;

            _refreshTokenRepository = refreshTokenRepository;
        }
        public IAccountRepository AccountRepository => _accountRepository;

        public IBrandRepository BrandRepository => _brandRepository;

        public IRefreshTokenRepository RefreshTokenRepository =>  _refreshTokenRepository;

        public ICategoryRepository CategoryRepository => _categoryRepository;

        public async Task<int> SaveChangeAsync()
        {
            return await _dbContext.SaveChangesAsync();
        }
    }
}
