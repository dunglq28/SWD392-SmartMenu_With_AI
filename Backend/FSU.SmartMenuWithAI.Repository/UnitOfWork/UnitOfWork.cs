﻿using FSU.SmartMenuWithAI.BussinessObject.Entitites;
using FSU.SmartMenuWithAI.Repository.Repositories;
using Microsoft.Extensions.Configuration;


namespace FSU.SmartMenuWithAI.Repository.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private SmartMenuContext _context;
        private GenericRepository<Category> _categoryRepo;
        private AppUserRepository _appUserRepo;
        private AccountRepository _accountRepo;
        private RefreshTokenRepository _refreshTokenRepo;
        private readonly IConfiguration _configuration;

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
    }
}