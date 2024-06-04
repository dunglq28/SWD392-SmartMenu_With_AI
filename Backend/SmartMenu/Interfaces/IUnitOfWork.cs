namespace SmartMenu.Interfaces
{
    public interface IUnitOfWork
    {
        public IRefreshTokenRepository RefreshTokenRepository { get; }
        public IAccountRepository AccountRepository { get; }
        public IBrandRepository BrandRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public IStoreRepository StoreRepository { get; }
        public IMenuRepository MenuRepository { get; }
        public IGroupAttributeRepository GroupAttributeRepository { get; }

    }
}
