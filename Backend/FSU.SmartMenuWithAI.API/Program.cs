using Amazon.S3;
using Amazon;
using Microsoft.OpenApi.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using FSU.SmartMenuWithAI.API.Middlewares;
using System.Text;
using FSU.SmartMenuWithAI.Repository.UnitOfWork;
using FSU.SmartMenuWithAI.Service.Services;
using FSU.SmartMenuWithAI.Service.ISerivice;
using Microsoft.EntityFrameworkCore;
using FSU.SmartMenuWithAI.Repository.Interfaces;
using FSU.SmartMenuWithAI.Repository.Repositories;
using FSU.SmartMenuWithAI.API.Payloads.Responses;
using FSU.SmartMenuWithAI.Service.Mappings;
using FSU.SmartMenuWithAI.Repository.Entities;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<SmartMenuContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));

});
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNamingPolicy = new KebabCaseNamingPolicy();
    options.JsonSerializerOptions.DictionaryKeyPolicy = new KebabCaseNamingPolicy();
});
builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo { Title = "SmartMenu API", Version = "v1" });
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    }); option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type=ReferenceType.SecurityScheme,
                    Id="Bearer"
                }
            },
            new string[]{}
        }
    });
});
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
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
builder.Services.AddScoped<IAccountRepository, AccountRepository>();
builder.Services.AddScoped<IAppUserRepository,AppUserRepository>();
builder.Services.AddScoped<IBrandRepository,  BrandRepository>();
builder.Services.AddScoped<IMenuListRepository,  MenuListRepository>();
builder.Services.AddScoped<IGroupAttributeRepository, GroupAttributeRepository>();
builder.Services.AddScoped<IAttributeRepository, AttributeRepository>();
builder.Services.AddScoped<IListPositionRepository, ListPositionRepository>();


// Register servicies
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IAppUserService, AppUserService>();
builder.Services.AddScoped<IBrandService, BrandService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IStoreService, StoreService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IMenuListService, MenuListService>();
//builder.Services.AddScoped<IProductMenuSerivce, ProductMenuSerivce>();
builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
builder.Services.AddScoped<IGroupAttributeService, GroupAttributeService>();
builder.Services.AddScoped<IAttributeService, AttributeService>();
builder.Services.AddScoped<IListPositionService, ListPositionService>();



//Config Jwt Token
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration["JWT:ValidAudience"],
        ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:SecretKey"])),
        ClockSkew = TimeSpan.Zero
    };
});

// Add CORS
builder.Services.AddCors(p => p.AddPolicy("Cors", policy =>
{
    policy.WithOrigins("*")
          .AllowAnyHeader()
          .AllowAnyMethod();
}));


var app = builder.Build();

app.UseCors("Cors");

// Config Middleware
app.UseMiddleware<AccountStatusMiddleware>();
app.UseMiddleware<TokenValidationMiddleware>();

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
