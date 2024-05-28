using Microsoft.EntityFrameworkCore;
using SmartMenu.Entities;

namespace SmartMenu.Data
{
    public static class DatabaseInitialiserExtension
    {
        public static async Task InitialiseDatabaseAsync(this WebApplication app)
        {
            // Create IServiceScope to resolve service scope
            using (var scope = app.Services.CreateScope())
            {
                var initialiser = scope.ServiceProvider.GetRequiredService<DatabaseInitialiser>();

                await initialiser.InitialiseAsync();

                // Try to seeding data
                await initialiser.SeedAsync();

            }
        }
    }

    public interface IDatabaseInitialiser
    {
        Task InitialiseAsync();
        Task SeedAsync();
        Task TrySeedAsync();
    }

    public class DatabaseInitialiser : IDatabaseInitialiser
    {
        private readonly SmartMenuContext _context;
        private readonly IWebHostEnvironment _env;

        public DatabaseInitialiser(SmartMenuContext context,
            IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task InitialiseAsync()
        {
            try
            {
                if (_env.IsDevelopment()) return;

                // Check if database is not exist 
                if (!_context.Database.CanConnect())
                {
                    // Migration Database - Create database 
                    await _context.Database.MigrateAsync();
                }

                // Check if migrations have already been applied 
                var appliedMigrations = await _context.Database.GetAppliedMigrationsAsync();
                
                if (appliedMigrations.Any())
                {
                    Console.WriteLine("Migrations have already been applied. Skip migratons proccess.");
                    return;
                }

                Console.WriteLine("Database migrated successfully");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task SeedAsync()
        {
            try
            {
                await TrySeedAsync();
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task TrySeedAsync()
        {
            try 
            {
                if (_context.Brands.Any()) return;

                Console.WriteLine("--> Seeding Data");

                var Brands = new List<Brand>()
                {
                    new(){ BrandCode = Guid.NewGuid().ToString(), BrandName = "Test Code" },
                    new(){ BrandCode = Guid.NewGuid().ToString(), BrandName = "Test Code" },
                    new(){ BrandCode = Guid.NewGuid().ToString(), BrandName = "Test Code" },
                    new(){ BrandCode = Guid.NewGuid().ToString(), BrandName = "Test Code" },
                    new(){ BrandCode = Guid.NewGuid().ToString(), BrandName = "Test Code" }
                };

                await _context.Brands.AddRangeAsync(Brands);
                await _context.SaveChangesAsync();
                Console.WriteLine("--> Seeding Data Successfully");
            }catch(Exception){
                throw;
            }
        }
    }
}
