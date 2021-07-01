using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Configuration;

#nullable disable

namespace MediereAI.Models
{
    public partial class MediereAIContext : DbContext
    {
        public MediereAIContext()
        {
        }

        public MediereAIContext(DbContextOptions<MediereAIContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Medieri> Medieri { get; set; }
        public virtual DbSet<Setari> Setari { get; set; }
        public virtual DbSet<Utilizatori> Utilizatori { get; set; }
        public virtual DbSet<Vizualizari> Vizualizari { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                IConfigurationRoot configuration = new ConfigurationBuilder()
                   .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                   .AddJsonFile("appsettings.json")
                   .Build();
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("DevConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Latin1_General_CI_AS");

            modelBuilder.Entity<Medieri>(entity =>
            {
                entity.ToTable("Medieri");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.DataTranzactiei)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Descriere)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.EmailReclamat)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Raspuns)
                    .HasMaxLength(8000)
                    .IsUnicode(false);

                entity.Property(e => e.Reclamant)
                    .IsRequired()
                    .HasMaxLength(101)
                    .IsUnicode(false);

                entity.Property(e => e.Reclamat)
                    .HasMaxLength(101)
                    .IsUnicode(false);

                entity.Property(e => e.StatusMediere)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Subiect)
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.TelefonReclamat)
                    .HasMaxLength(10)
                    .IsFixedLength(true);
            });

            modelBuilder.Entity<Setari>(entity =>
            {
                entity.ToTable("Setari");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Adresa)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Parola)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Vizitari).HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<Utilizatori>(entity =>
            {
                entity.HasKey(e => e.Email);

                entity.ToTable("Utilizatori");

                entity.Property(e => e.Email)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Counter).HasColumnType("numeric(18, 0)");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Nume)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Parola)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Prenume)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Telefon)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsFixedLength(true);

                entity.Property(e => e.Verificat).HasColumnType("numeric(18, 0)");
            });

            modelBuilder.Entity<Vizualizari>(entity =>
            {
                entity.ToTable("Vizualizari");

                entity.Property(e => e.Id)
                    .HasColumnType("numeric(18, 0)")
                    .ValueGeneratedOnAdd();

                entity.Property(e => e.Data)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NumarVizualizari).HasColumnType("numeric(18, 0)");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
