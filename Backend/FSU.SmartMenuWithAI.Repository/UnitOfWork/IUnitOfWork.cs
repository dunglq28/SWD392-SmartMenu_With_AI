using FSU.SmartMenuWithAI.Repository.Entities;
using FSU.SmartMenuWithAI.Repository.Repositories;


namespace FSU.SmartMenuWithAI.Repository.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
        Task<int> SaveAsync();
        public GenericRepository<Category> CategoryRepository { get; }
        public RefreshTokenRepository RefreshTokenRepository { get; }
        public AppUserRepository AppUserRepository { get; }
        public AccountRepository AccountRepository { get; }
        public GenericRepository<Store> StoreRepository { get; }
        public GenericRepository<Menu> MenuRepository { get; }
        public GenericRepository<Product> ProductRepository { get; }
        //public ProductMenuRepository ProductMenuRepository { get; }
        public BrandRepository BrandRepository { get; }
        public GroupAttributeRepository GroupAttributeRepository { get; }
        public AttributeRepository AttributeRepository { get; }

    }
}
