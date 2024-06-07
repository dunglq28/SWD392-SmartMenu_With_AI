using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using FSU.SmartMenuWithAI.Repository.Repositories;


namespace FSU.SmartMenuWithAI.Repository.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
        Task<int> SaveAsync();
        public GenericRepository<Menu> CategoryRepository { get; }
        public RefreshTokenRepository RefreshTokenRepository { get; }
        public AppUserRepository AppUserRepository { get; }
        public AccountRepository AccountRepository { get; }
        public GenericRepository<Store> StoreRepository { get; }
        public GenericRepository<Menu> MenuRepository { get; }
        public GenericRepository<Product> ProductRepository { get; }

        public BrandRepository BrandRepository { get; }
    }
}
