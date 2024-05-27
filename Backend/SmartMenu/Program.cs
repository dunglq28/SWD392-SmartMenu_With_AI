using Amazon;
using Amazon.S3;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using SmartMenu.Data;
using SmartMenu.Entities;
using SmartMenu.Interfaces;
using SmartMenu.Mappings;
using SmartMenu.Repositories;
using SmartMenu.Services;

var builder = WebApplication.CreateBuilder(args);

// Applying connection string
builder.Services.AddDbContext<SmartMenuContext>(opt =>
{
    opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//Config AWSS3
builder.Services.AddSingleton<IAmazonS3, AmazonS3Client>();
builder.Services.AddScoped<IS3Service, S3Service>();
AWSConfigs.AWSRegion = "ap-southeast-1";

// Add Mapping profiles
var mapper = new MapperConfiguration(mc =>
{
    mc.AddProfile<MappingProfile>();
});

builder.Services.AddSingleton(mapper.CreateMapper());
// Register repositories
builder.Services.AddScoped<IBrandRepository, BrandRepository>();
builder.Services.AddScoped<DatabaseInitialiser>();

var app = builder.Build();

// Hook into application lifetime events and trigger only application fully started
app.Lifetime.ApplicationStarted.Register(async () =>
{
    // Database Initialiser
    await app.InitialiseDatabaseAsync();
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
