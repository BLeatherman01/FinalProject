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
            entity.HasKey(e => e.Id).HasName("PK__MyGarden__3214EC07B25E957D");
            entity.Property(e => e.GardenName).HasMaxLength(25);
            entity.Property(e => e.Description).HasMaxLength(90);
            entity.Property(e => e.GardenId).HasColumnName("GardenID");
            entity.Property(e => e.Notes).HasMaxLength(250);

            entity.HasOne(d => d.Garden).WithMany(p => p.MyGardens)
                .HasForeignKey(d => d.GardenId)
                .HasConstraintName("FK__MyGarden__Garden__6FE99F9F");
        });


        modelBuilder.Entity<RecentPlant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RecentPl__3214EC07B98D732B");
                        
            entity.Property(e => e.PlantDate).HasColumnType("date");
            entity.Property(e => e.PickBloom).HasColumnType("date");            
            entity.Property(e => e.WateringFreq).HasColumnName("WateringFreq");
            entity.Property(e => e.Season).HasMaxLength(30);
            entity.Property(e => e.PlantId).HasMaxLength(90).HasColumnName("PlantID");
            entity.Property(e => e.PlantImageUrl).HasMaxLength(225);

            entity.HasOne(d => d.Garden).WithMany(p => p.RecentPlants)
                .HasForeignKey(d => d.GardenId)
                .HasConstraintName("FK__RecentPla__Garde__787EE5A0");
        });


        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07EDD055CF");

            entity.Property(e => e.UserName).HasMaxLength(25);
            entity.Property(e => e.GoogleId).HasMaxLength(60).HasColumnName("GoogleID");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
