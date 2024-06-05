using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace FSU.SmartMenuWithAI.BussinessObject.Entitites;

public partial class SmartMenuContext : DbContext
{
    public SmartMenuContext()
    {
    }

    public SmartMenuContext(DbContextOptions<SmartMenuContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AppUser> AppUsers { get; set; }

    public virtual DbSet<Attribute> Attributes { get; set; }

    public virtual DbSet<Brand> Brands { get; set; }

    public virtual DbSet<Category> Categories { get; set; }

    public virtual DbSet<CustomerSegment> CustomerSegments { get; set; }

    public virtual DbSet<CustomerVisit> CustomerVisits { get; set; }

    public virtual DbSet<GroupAttribute> GroupAttributes { get; set; }

    public virtual DbSet<Menu> Menus { get; set; }

    public virtual DbSet<MenuSegment> MenuSegments { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductMenu> ProductMenus { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Screen> Screens { get; set; }

    public virtual DbSet<ScreenMenu> ScreenMenus { get; set; }

    public virtual DbSet<SegmentAttribute> SegmentAttributes { get; set; }

    public virtual DbSet<Store> Stores { get; set; }

    public virtual DbSet<VisitAttribute> VisitAttributes { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer(GetConnectionString());
        }
    }

    private string GetConnectionString()
    {
        IConfiguration config = new ConfigurationBuilder()
         .SetBasePath(Directory.GetCurrentDirectory())
        .AddJsonFile("appsettings.json", true, true)
        .Build();
        var strConn = config["ConnectionStrings:DefaultConnection"];

        return strConn;
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AppUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__AppUser__1788CCACC1323E04");

            entity.ToTable("AppUser");

            entity.HasIndex(e => e.UserCode, "UQ__AppUser__1DF52D0CCED99DFC").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.UserCode).HasMaxLength(36);
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);

            entity.HasOne(d => d.Role).WithMany(p => p.AppUsers)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__AppUser__RoleID__3A81B327");
        });

        modelBuilder.Entity<Attribute>(entity =>
        {
            entity.HasKey(e => e.AttributeId).HasName("PK__Attribut__C189298A832DC722");

            entity.ToTable("Attribute");

            entity.HasIndex(e => e.AttributeCode, "UQ__Attribut__BD3ED16EA36FE364").IsUnique();

            entity.Property(e => e.AttributeId).HasColumnName("AttributeID");
            entity.Property(e => e.AttributeCode).HasMaxLength(36);
            entity.Property(e => e.AttributeName).HasMaxLength(100);
            entity.Property(e => e.GroupAttributeId).HasColumnName("GroupAttributeID");

            entity.HasOne(d => d.GroupAttribute).WithMany(p => p.Attributes)
                .HasForeignKey(d => d.GroupAttributeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Attribute__Group__5812160E");
        });

        modelBuilder.Entity<Brand>(entity =>
        {
            entity.HasKey(e => e.BrandId).HasName("PK__Brand__DAD4F3BEFB598D60");

            entity.ToTable("Brand");

            entity.HasIndex(e => e.BrandCode, "UQ__Brand__44292CC77B2DB047").IsUnique();

            entity.Property(e => e.BrandId).HasColumnName("BrandID");
            entity.Property(e => e.BrandCode).HasMaxLength(36);
            entity.Property(e => e.BrandName).HasMaxLength(100);
            entity.Property(e => e.ImageName).HasMaxLength(100);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.Brands)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Brand__UserID__4222D4EF");
        });

        modelBuilder.Entity<Category>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Category__19093A2B1F0791B3");

            entity.ToTable("Category");

            entity.HasIndex(e => e.CategoryCode, "UQ__Category__371BA95519B0AAFC").IsUnique();

            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.BrandId).HasColumnName("BrandID");
            entity.Property(e => e.CategoryCode).HasMaxLength(36);
            entity.Property(e => e.CategoryName).HasMaxLength(50);

            entity.HasOne(d => d.Brand).WithMany(p => p.Categories)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Category__BrandI__4AB81AF0");
        });

        modelBuilder.Entity<CustomerSegment>(entity =>
        {
            entity.HasKey(e => e.SegmentId).HasName("PK__Customer__C680609B0D7B6DB3");

            entity.ToTable("CustomerSegment");

            entity.HasIndex(e => e.SegmentCode, "UQ__Customer__4A834E88468F0695").IsUnique();

            entity.Property(e => e.SegmentId).HasColumnName("SegmentID");
            entity.Property(e => e.BrandId).HasColumnName("BrandID");
            entity.Property(e => e.SegmentCode).HasMaxLength(36);

            entity.HasOne(d => d.Brand).WithMany(p => p.CustomerSegments)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__CustomerS__Brand__52593CB8");
        });

        modelBuilder.Entity<CustomerVisit>(entity =>
        {
            entity.HasKey(e => e.CustomerVisitId).HasName("PK__Customer__1DE5EEC190CB5893");

            entity.ToTable("CustomerVisit");

            entity.Property(e => e.CustomerVisitId).HasColumnName("CustomerVisitID");
            entity.Property(e => e.ImageCustomerName).HasMaxLength(200);
            entity.Property(e => e.SegmentId).HasColumnName("SegmentID");
        });

        modelBuilder.Entity<GroupAttribute>(entity =>
        {
            entity.HasKey(e => e.GroupAttributeId).HasName("PK__GroupAtt__2B6E45663075E880");

            entity.ToTable("GroupAttribute");

            entity.Property(e => e.GroupAttributeId).HasColumnName("GroupAttributeID");
            entity.Property(e => e.GroupAttributeName).HasMaxLength(100);
        });

        modelBuilder.Entity<Menu>(entity =>
        {
            entity.HasKey(e => e.MenuId).HasName("PK__Menu__C99ED250E5BF5B4A");

            entity.ToTable("Menu");

            entity.HasIndex(e => e.MenuCode, "UQ__Menu__868A3A730BA8A853").IsUnique();

            entity.Property(e => e.MenuId).HasColumnName("MenuID");
            entity.Property(e => e.BrandId).HasColumnName("BrandID");
            entity.Property(e => e.MenuCode).HasMaxLength(36);

            entity.HasOne(d => d.Brand).WithMany(p => p.Menus)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Menu__BrandID__5EBF139D");
        });

        modelBuilder.Entity<MenuSegment>(entity =>
        {
            entity.HasKey(e => new { e.MenuId, e.SegmentId }).HasName("PK__MenuSegm__65F6D459219B98F4");

            entity.ToTable("MenuSegment");

            entity.Property(e => e.MenuId).HasColumnName("MenuID");
            entity.Property(e => e.SegmentId).HasColumnName("SegmentID");

            entity.HasOne(d => d.Menu).WithMany(p => p.MenuSegments)
                .HasForeignKey(d => d.MenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MenuSegme__MenuI__6754599E");

            entity.HasOne(d => d.Segment).WithMany(p => p.MenuSegments)
                .HasForeignKey(d => d.SegmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__MenuSegme__Segme__68487DD7");
        });

        modelBuilder.Entity<Product>(entity =>
        {
            entity.HasKey(e => e.ProductId).HasName("PK__Product__B40CC6ED6A65B21E");

            entity.ToTable("Product");

            entity.HasIndex(e => e.ProductCode, "UQ__Product__2F4E024F61F2B691").IsUnique();

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.BrandId).HasColumnName("BrandID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.ImageName).HasMaxLength(200);
            entity.Property(e => e.ProductCode).HasMaxLength(36);
            entity.Property(e => e.ProductName).HasMaxLength(200);
            entity.Property(e => e.SpotlightVideoImageName)
                .HasMaxLength(200)
                .HasColumnName("SpotlightVideo_ImageName");
            entity.Property(e => e.SpotlightVideoImageUrl).HasColumnName("SpotlightVideo_ImageUrl");

            entity.HasOne(d => d.Category).WithMany(p => p.Products)
                .HasForeignKey(d => d.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Product__Categor__4E88ABD4");
        });

        modelBuilder.Entity<ProductMenu>(entity =>
        {
            entity.HasKey(e => new { e.ProductId, e.MenuId }).HasName("PK__ProductM__A8952BC84062096A");

            entity.ToTable("ProductMenu");

            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.MenuId).HasColumnName("MenuID");

            entity.HasOne(d => d.Menu).WithMany(p => p.ProductMenus)
                .HasForeignKey(d => d.MenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ProductMe__MenuI__628FA481");

            entity.HasOne(d => d.Product).WithMany(p => p.ProductMenus)
                .HasForeignKey(d => d.ProductId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ProductMe__Produ__619B8048");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.RefreshTokenId).HasName("PK__RefreshT__F5845E597C85CB98");

            entity.ToTable("RefreshToken");

            entity.HasIndex(e => e.RefreshTokenCode, "UQ__RefreshT__5FC54920CBCF24E7").IsUnique();

            entity.Property(e => e.RefreshTokenId).HasColumnName("RefreshTokenID");
            entity.Property(e => e.CreatedAt).HasColumnType("datetime");
            entity.Property(e => e.ExpiresAt).HasColumnType("datetime");
            entity.Property(e => e.JwtId)
                .HasMaxLength(150)
                .HasColumnName("JwtID");
            entity.Property(e => e.RefreshTokenCode).HasMaxLength(36);
            entity.Property(e => e.RefreshTokenValue).HasMaxLength(255);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__RefreshTo__UserI__3E52440B");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__Role__8AFACE3A1F9C8FBA");

            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Screen>(entity =>
        {
            entity.HasKey(e => e.ScreenId).HasName("PK__Screen__0AB60F854A7CB078");

            entity.ToTable("Screen");

            entity.Property(e => e.ScreenId).HasColumnName("ScreenID");
            entity.Property(e => e.StoreId).HasColumnName("StoreID");

            entity.HasOne(d => d.Store).WithMany(p => p.Screens)
                .HasForeignKey(d => d.StoreId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Screen__StoreID__6EF57B66");
        });

        modelBuilder.Entity<ScreenMenu>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("ScreenMenu");

            entity.Property(e => e.MenuId).HasColumnName("MenuID");
            entity.Property(e => e.ScreenId).HasColumnName("ScreenID");

            entity.HasOne(d => d.Menu).WithMany()
                .HasForeignKey(d => d.MenuId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ScreenMen__MenuI__71D1E811");

            entity.HasOne(d => d.Screen).WithMany()
                .HasForeignKey(d => d.ScreenId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__ScreenMen__Scree__70DDC3D8");
        });

        modelBuilder.Entity<SegmentAttribute>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("SegmentAttribute");

            entity.Property(e => e.AttributeId).HasColumnName("AttributeID");
            entity.Property(e => e.SegmentId).HasColumnName("SegmentID");
            entity.Property(e => e.Value).HasMaxLength(125);

            entity.HasOne(d => d.Attribute).WithMany()
                .HasForeignKey(d => d.AttributeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SegmentAt__Attri__5AEE82B9");

            entity.HasOne(d => d.Segment).WithMany()
                .HasForeignKey(d => d.SegmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SegmentAt__Segme__59FA5E80");
        });

        modelBuilder.Entity<Store>(entity =>
        {
            entity.HasKey(e => e.StoreId).HasName("PK__Store__3B82F0E1776F0039");

            entity.ToTable("Store");

            entity.HasIndex(e => e.StoreCode, "UQ__Store__02A384F85F33A21C").IsUnique();

            entity.Property(e => e.StoreId).HasColumnName("StoreID");
            entity.Property(e => e.Address).HasMaxLength(150);
            entity.Property(e => e.BrandId).HasColumnName("BrandID");
            entity.Property(e => e.City).HasMaxLength(150);
            entity.Property(e => e.StoreCode).HasMaxLength(36);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Brand).WithMany(p => p.Stores)
                .HasForeignKey(d => d.BrandId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Store__BrandID__45F365D3");

            entity.HasOne(d => d.User).WithMany(p => p.Stores)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Store__UserID__46E78A0C");
        });

        modelBuilder.Entity<VisitAttribute>(entity =>
        {
            entity.HasKey(e => new { e.CustomerVisitId, e.AttributeId }).HasName("PK__VisitAtt__A1FD7C59B17B715E");

            entity.ToTable("VisitAttribute");

            entity.Property(e => e.CustomerVisitId).HasColumnName("CustomerVisitID");
            entity.Property(e => e.AttributeId).HasColumnName("AttributeID");
            entity.Property(e => e.Value).HasMaxLength(200);

            entity.HasOne(d => d.Attribute).WithMany(p => p.VisitAttributes)
                .HasForeignKey(d => d.AttributeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__VisitAttr__Attri__6C190EBB");

            entity.HasOne(d => d.CustomerVisit).WithMany(p => p.VisitAttributes)
                .HasForeignKey(d => d.CustomerVisitId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__VisitAttr__Custo__6B24EA82");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
