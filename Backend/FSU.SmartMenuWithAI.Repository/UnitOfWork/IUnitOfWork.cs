using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using FSU.SmartMenuWithAI.Repository.Repositories;


namespace FSU.SmartMenuWithAI.Repository.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        void Save();
        Task<int> SaveAsync();
        public AppUserRepository AppUserRepository { get; }
        public GenericRepository<Category> CategoryRepository { get; }
        public AccountRepository AccountRepository { get; }
        public RefreshTokenRepository RefreshTokenRepository { get; }
        public BrandRepository BrandRepository { get; }
    }
}
