using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FSU.SmartMenuWithAI.Repository.Test;

public partial class OilPaintingArt2024DbContext : DbContext
{
    public OilPaintingArt2024DbContext()
    {
    }

    public OilPaintingArt2024DbContext(DbContextOptions<OilPaintingArt2024DbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<OilPaintingArt> OilPaintingArts { get; set; }

    public virtual DbSet<SupplierCompany> SupplierCompanies { get; set; }

    public virtual DbSet<SystemAccount> SystemAccounts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("server = (local); database= OilPaintingArt2024DB;uid=SA;pwd=12345;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<OilPaintingArt>(entity =>
        {
            entity.HasKey(e => e.OilPaintingArtId).HasName("PK__OilPaint__708184D8CE4E1D80");

            entity.ToTable("OilPaintingArt");

            entity.Property(e => e.OilPaintingArtId).ValueGeneratedNever();
            entity.Property(e => e.ArtTitle).HasMaxLength(100);
            entity.Property(e => e.Artist).HasMaxLength(80);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.NotablFeatures).HasMaxLength(250);
            entity.Property(e => e.OilPaintingArtLocation).HasMaxLength(240);
            entity.Property(e => e.OilPaintingArtStyle).HasMaxLength(50);
            entity.Property(e => e.PriceOfOilPaintingArt).HasColumnType("decimal(18, 0)");
            entity.Property(e => e.SupplierId).HasMaxLength(30);

            entity.HasOne(d => d.Supplier).WithMany(p => p.OilPaintingArts)
                .HasForeignKey(d => d.SupplierId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__OilPainti__Suppl__3C69FB99");
        });

        modelBuilder.Entity<SupplierCompany>(entity =>
        {
            entity.HasKey(e => e.SupplierId).HasName("PK__Supplier__4BE666B4C4524FF3");

            entity.ToTable("SupplierCompany");

            entity.Property(e => e.SupplierId).HasMaxLength(30);
            entity.Property(e => e.CompanyName).HasMaxLength(100);
            entity.Property(e => e.CompanyTypeDescription).HasMaxLength(250);
        });

        modelBuilder.Entity<SystemAccount>(entity =>
        {
            entity.HasKey(e => e.AccountId).HasName("PK__SystemAc__349DA586C2FCA217");

            entity.ToTable("SystemAccount");

            entity.HasIndex(e => e.AccountEmail, "UQ__SystemAc__FC770D3320156271").IsUnique();

            entity.Property(e => e.AccountId)
                .ValueGeneratedNever()
                .HasColumnName("AccountID");
            entity.Property(e => e.AccountEmail).HasMaxLength(80);
            entity.Property(e => e.AccountFullName).HasMaxLength(80);
            entity.Property(e => e.AccountPassword).HasMaxLength(40);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
