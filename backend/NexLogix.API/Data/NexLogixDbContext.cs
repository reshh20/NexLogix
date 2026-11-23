using Microsoft.EntityFrameworkCore;
using NexLogix.API.Models;

namespace NexLogix.API.Data;

public class NexLogixDbContext : DbContext
{
    public NexLogixDbContext(DbContextOptions<NexLogixDbContext> options) : base(options) { }

    public DbSet<User>              Users              { get; set; }
    public DbSet<Shipment>          Shipments          { get; set; }
    public DbSet<Customer>          Customers          { get; set; }
    public DbSet<DeliveryException> DeliveryExceptions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Unique constraints
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Shipment>()
            .HasIndex(s => s.TrackingNumber)
            .IsUnique();

        // Shipment → Customer (many-to-one)
        modelBuilder.Entity<Shipment>()
            .HasOne(s => s.Customer)
            .WithMany(c => c.Shipments)
            .HasForeignKey(s => s.CustomerId)
            .OnDelete(DeleteBehavior.Restrict);

        // Shipment → User (many-to-one, optional)
        modelBuilder.Entity<Shipment>()
            .HasOne(s => s.AssignedUser)
            .WithMany(u => u.Shipments)
            .HasForeignKey(s => s.AssignedUserId)
            .OnDelete(DeleteBehavior.SetNull);

        // DeliveryException → Shipment (many-to-one)
        modelBuilder.Entity<DeliveryException>()
            .HasOne(e => e.Shipment)
            .WithMany(s => s.Exceptions)
            .HasForeignKey(e => e.ShipmentId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
