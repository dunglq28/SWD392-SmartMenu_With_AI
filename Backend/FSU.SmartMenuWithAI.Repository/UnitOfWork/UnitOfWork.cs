using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.Repositories;
using Microsoft.Extensions.Configuration;


namespace FSU.SmartMenuWithAI.Repository.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IConfiguration _configuration;
        private RefreshTokenRepository _refreshTokenRepo;
        private SmartMenuContext _context;

        private AppUserRepository _appUserRepo;
        private AccountRepository _accountRepo;
        private GenericRepository<Category> _categoryRepo;
        private GenericRepository<Store> _storeRepo;
        private GenericRepository<Menu> _menuRepo;
        private GenericRepository<Product> _productRepo;
        private ProductMenuRepository _productMenuRepo;
        private BrandRepository _brandRepo;

        public UnitOfWork(SmartMenuContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


        public void Save()
        {
            _context.SaveChanges();
        }
        public async Task<int> SaveAsync()
        {
            return await _context.SaveChangesAsync();
        }
        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        GenericRepository<Category> IUnitOfWork.CategoryRepository
        {
            get
            {
                if (_categoryRepo == null)
                {
                    this._categoryRepo = new GenericRepository<Category>(_context);
                }
                return _categoryRepo;
            }
        }

        public AppUserRepository AppUserRepository
        {
            get
            {
                if (_appUserRepo == null)
                {
                    this._appUserRepo = new AppUserRepository(_context);
                }
                return _appUserRepo;
            }
        }

        AccountRepository IUnitOfWork.AccountRepository
        {
            get
            {
                if (_accountRepo == null)
                {
                    this._accountRepo = new AccountRepository(_context, _configuration);
                }
                return _accountRepo;
            }
        }

        GenericRepository<Store> IUnitOfWork.StoreRepository
        {
            get
            {
                if (_storeRepo == null)
                {
                    this._storeRepo = new GenericRepository<Store>(_context);
                }
                return _storeRepo;
            }
        }
        GenericRepository<Menu> IUnitOfWork.MenuRepository
        {
            get
            {
                if (_menuRepo == null)
                {
                    this._menuRepo = new GenericRepository<Menu>(_context);
                }
                return _menuRepo;
            }
        }
        GenericRepository<Product> IUnitOfWork.ProductRepository
        {
            get
            {
                if (_productRepo == null)
                {
                    this._productRepo = new GenericRepository<Product>(_context);
                }
                return _productRepo;
            }
        }
        public ProductMenuRepository ProductMenuRepository
        {
            get
            {
                if (_productMenuRepo == null)
                {
                    this._productMenuRepo = new ProductMenuRepository(_context);
                }
                return _productMenuRepo;
            }
        }
        RefreshTokenRepository IUnitOfWork.RefreshTokenRepository
        {
            get
            {
                if (_refreshTokenRepo == null)
                {
                    this._refreshTokenRepo = new RefreshTokenRepository(_context, _configuration);
                }
                return _refreshTokenRepo;
            }
        }
        BrandRepository IUnitOfWork.BrandRepository
        {
            get
            {
                if (_brandRepo == null)
                {
                    this._brandRepo = new BrandRepository(_context, _configuration);
                }
                return _brandRepo;
            }
        }
    }
}
