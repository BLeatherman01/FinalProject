using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace FinalProjectGarden.Models;

public partial class GreenGrassDbContext : DbContext
{
    public GreenGrassDbContext()
    {
    }

    public GreenGrassDbContext(DbContextOptions<GreenGrassDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<MyGarden> MyGardens { get; set; }

    public virtual DbSet<RecentPlant> RecentPlants { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer(Secret.sqlScaff);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MyGarden>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__MyGarden__3214EC07D3FB6DEA");

            entity.Property(e => e.Description).HasMaxLength(90);
            entity.Property(e => e.GardenId).HasColumnName("GardenID");
            entity.Property(e => e.GardenName).HasMaxLength(25);
            entity.Property(e => e.PickBloom).HasColumnType("date");
            entity.Property(e => e.PlantDate).HasColumnType("date");
            entity.Property(e => e.Season).HasMaxLength(30);

            entity.HasOne(d => d.Garden).WithMany(p => p.MyGardens)
                .HasForeignKey(d => d.GardenId)
                .HasConstraintName("FK__MyGardens__Garde__60A75C0F");
        });

        modelBuilder.Entity<RecentPlant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RecentPl__3214EC07FC33F7A9");

            entity.Property(e => e.RecentPlants).HasMaxLength(60);
            entity.Property(e => e.UserName).HasMaxLength(25);

            entity.HasOne(d => d.RecentIdsNavigation).WithMany(p => p.RecentPlants)
                .HasForeignKey(d => d.RecentIds)
                .HasConstraintName("FK__RecentPla__Recen__619B8048");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07EDD055CF");

            entity.Property(e => e.GoogleId)
                .HasMaxLength(60)
                .HasColumnName("GoogleID");
            entity.Property(e => e.UserName).HasMaxLength(25);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
