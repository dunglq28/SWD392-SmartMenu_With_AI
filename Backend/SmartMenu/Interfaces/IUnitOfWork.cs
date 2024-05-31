namespace SmartMenu.Interfaces
{
    public interface IUnitOfWork
    {
        public IAccountRepository AccountRepository { get; }
        public IBrandRepository BrandRepository { get; }
        public ICategoryRepository CategoryRepository { get; }
        public IRefreshTokenRepository RefreshTokenRepository { get; }

    }
}
