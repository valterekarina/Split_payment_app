using Microsoft.EntityFrameworkCore;
using Split_payment.Models;

namespace Split_payment.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Apartment> Apartments { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Note> Notes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
                entity.Property(e => e.ApartmentId).IsRequired(false);
                entity.Property(e => e.LivingArea).IsRequired(false);

                entity.HasOne(u => u.Apartment)
                    .WithMany(u => u.Users)
                    .HasForeignKey(u => u.ApartmentId)
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<Apartment>(entity =>
            {
                entity.HasMany(a => a.Users)
                    .WithOne(u => u.Apartment)
                    .HasForeignKey(u => u.ApartmentId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasMany(a => a.Notes)
                    .WithOne(n => n.Apartment)
                    .HasForeignKey(n => n.ApartmentId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(a => a.Invoices)
                    .WithOne(n => n.Apartment)
                    .HasForeignKey(n => n.ApartmentId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Invoice>(entity =>
            {
                entity.HasIndex(e => e.InvoiceNo).IsUnique();

                entity.HasOne(i => i.User)
                    .WithMany(u => u.Invoices)
                    .HasForeignKey(i => i.UserId)
                    .OnDelete(DeleteBehavior.SetNull);

                entity.HasOne(i => i.Apartment)
                    .WithMany(a => a.Invoices)
                    .HasForeignKey(i => i.ApartmentId)
                    .OnDelete(DeleteBehavior.SetNull);
            });
        }
    }
}
