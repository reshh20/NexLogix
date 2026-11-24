using Microsoft.EntityFrameworkCore;
using NexLogix.API.Models;

namespace NexLogix.API.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(NexLogixDbContext db)
    {
        try
        {
            await db.Database.MigrateAsync();
        }
        catch
        {
            await db.Database.EnsureCreatedAsync();
        }

        // Seed Users if none exist
        if (!await db.Users.AnyAsync())
        {
            var defaultOperator = new User
            {
                FullName     = "Alex Mercer",
                Email        = "operator@nexlogix.io",
                Phone        = "+1 (503) 555-0100",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("NexLogix@2026", 12),
                Role         = "Operator",
                CreatedAt    = DateTime.UtcNow
            };

            var adminUser = new User
            {
                FullName     = "System Admin",
                Email        = "admin@nexlogix.io",
                Phone        = "+1 (503) 555-0101",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin@2026", 12),
                Role         = "Admin",
                CreatedAt    = DateTime.UtcNow
            };

            await db.Users.AddRangeAsync(defaultOperator, adminUser);
            await db.SaveChangesAsync();
        }

        // Seed Customers if none exist
        if (!await db.Customers.AnyAsync())
        {
            var customers = new List<Customer>
            {
                new() { Name = "Sarah Jenkins",  Email = "sarah.j@example.com", Phone = "+1 (503) 555-0142", Address = "1842 Oak Street, Portland, OR 97205" },
                new() { Name = "David Chen",     Email = "dchen@example.com",   Phone = "+1 (503) 555-0189", Address = "620 NW Everett St, Portland, OR 97209" },
                new() { Name = "Elena Rostova",  Email = "elena.r@example.com", Phone = "+1 (503) 555-0219", Address = "915 SE Belmont St, Portland, OR 97214" },
                new() { Name = "Marcus Vance",   Email = "m.vance@example.com", Phone = "+1 (503) 555-0322", Address = "247 NE Broadway, Portland, OR 97232" },
                new() { Name = "Chloe Simmons",  Email = "csimmons@example.com", Phone = "+1 (503) 555-0455", Address = "1030 SW Jefferson St, Portland, OR 97201" },
                new() { Name = "Brandon Lee",    Email = "blee@example.com",    Phone = "+1 (415) 555-0199", Address = "742 Market St, San Francisco, CA 94102" },
                new() { Name = "Sophia Patel",   Email = "spatel@example.com",  Phone = "+1 (212) 555-0188", Address = "350 5th Ave, New York, NY 10118" },
                new() { Name = "Carlos Mendez",  Email = "cmendez@example.com", Phone = "+1 (206) 555-0177", Address = "1200 4th Ave, Seattle, WA 98101" }
            };

            await db.Customers.AddRangeAsync(customers);
            await db.SaveChangesAsync();
        }

        // Seed Shipments if none exist or if only 5 exist
        if (await db.Shipments.CountAsync() < 12)
        {
            var customers = await db.Customers.ToListAsync();
            var primaryUser = await db.Users.FirstOrDefaultAsync();

            var c1 = customers.FirstOrDefault(c => c.Name == "Sarah Jenkins") ?? customers[0];
            var c2 = customers.FirstOrDefault(c => c.Name == "David Chen") ?? customers[1];
            var c3 = customers.FirstOrDefault(c => c.Name == "Elena Rostova") ?? customers[2];
            var c4 = customers.FirstOrDefault(c => c.Name == "Marcus Vance") ?? customers[3];
            var c5 = customers.FirstOrDefault(c => c.Name == "Chloe Simmons") ?? customers[4];
            var c6 = customers.FirstOrDefault(c => c.Name == "Brandon Lee") ?? customers[0];
            var c7 = customers.FirstOrDefault(c => c.Name == "Sophia Patel") ?? customers[1];
            var c8 = customers.FirstOrDefault(c => c.Name == "Carlos Mendez") ?? customers[2];

            var shipmentsToAdd = new List<Shipment>
            {
                // ── Hub 1: North Regional Hub - Terminal 4 ───────────────────────
                new() {
                    TrackingNumber     = "NLX-084291",
                    Status             = "At hub · delayed",
                    ScheduledDelivery  = DateTime.UtcNow.AddMinutes(28),
                    OriginAddress      = "North Regional Hub - Terminal 4 · Bay 7",
                    DestinationAddress = "1842 Oak Street, Portland, OR 97205",
                    WeightKg           = 4.2,
                    RiskScore          = 94.0,
                    RiskLevel          = "Critical",
                    CustomerId         = c1.Id,
                    AssignedUserId     = primaryUser?.Id
                },
                new() {
                    TrackingNumber     = "NLX-084176",
                    Status             = "Out for delivery",
                    ScheduledDelivery  = DateTime.UtcNow.AddMinutes(46),
                    OriginAddress      = "North Regional Hub - Terminal 4 · R-018",
                    DestinationAddress = "620 NW Everett St, Portland, OR 97209",
                    WeightKg           = 2.1,
                    RiskScore          = 91.0,
                    RiskLevel          = "Critical",
                    CustomerId         = c2.Id,
                    AssignedUserId     = primaryUser?.Id
                },
                new() {
                    TrackingNumber     = "NLX-083958",
                    Status             = "At hub · delayed",
                    ScheduledDelivery  = DateTime.UtcNow.AddHours(1).AddMinutes(12),
                    OriginAddress      = "North Regional Hub - Terminal 4 · R-031",
                    DestinationAddress = "915 SE Belmont St, Portland, OR 97214",
                    WeightKg           = 8.7,
                    RiskScore          = 89.0,
                    RiskLevel          = "Critical",
                    CustomerId         = c3.Id,
                    AssignedUserId     = primaryUser?.Id
                },

                // ── Hub 2: South Gateway Terminal 2 ──────────────────────────────
                new() {
                    TrackingNumber     = "NLX-091402",
                    Status             = "Line-haul delay",
                    ScheduledDelivery  = DateTime.UtcNow.AddMinutes(35),
                    OriginAddress      = "South Gateway Terminal 2 · Bay 4",
                    DestinationAddress = "742 Market St, San Francisco, CA 94102",
                    WeightKg           = 6.5,
                    RiskScore          = 88.0,
                    RiskLevel          = "Critical",
                    CustomerId         = c6.Id,
                    AssignedUserId     = primaryUser?.Id
                },
                new() {
                    TrackingNumber     = "NLX-091518",
                    Status             = "Sorting backlog",
                    ScheduledDelivery  = DateTime.UtcNow.AddHours(1).AddMinutes(40),
                    OriginAddress      = "South Gateway Terminal 2 · R-204",
                    DestinationAddress = "1055 Mission St, San Francisco, CA 94103",
                    WeightKg           = 3.4,
                    RiskScore          = 79.0,
                    RiskLevel          = "Critical",
                    CustomerId         = c6.Id,
                    AssignedUserId     = primaryUser?.Id
                },
                new() {
                    TrackingNumber     = "NLX-091629",
                    Status             = "Out for delivery",
                    ScheduledDelivery  = DateTime.UtcNow.AddHours(3).AddMinutes(10),
                    OriginAddress      = "South Gateway Terminal 2 · R-212",
                    DestinationAddress = "480 Castro St, San Francisco, CA 94114",
                    WeightKg           = 1.8,
                    RiskScore          = 48.0,
                    RiskLevel          = "Moderate",
                    CustomerId         = c6.Id,
                    AssignedUserId     = primaryUser?.Id
                },

                // ── Hub 3: East Coast Sortation Facility - Hub A ─────────────────
                new() {
                    TrackingNumber     = "NLX-073104",
                    Status             = "Severe weather hold",
                    ScheduledDelivery  = DateTime.UtcNow.AddMinutes(55),
                    OriginAddress      = "East Coast Sortation Facility - Hub A · Inbound 1",
                    DestinationAddress = "350 5th Ave, New York, NY 10118",
                    WeightKg           = 12.0,
                    RiskScore          = 96.0,
                    RiskLevel          = "Critical",
                    CustomerId         = c7.Id,
                    AssignedUserId     = primaryUser?.Id
                },
                new() {
                    TrackingNumber     = "NLX-073289",
                    Status             = "At hub · delayed",
                    ScheduledDelivery  = DateTime.UtcNow.AddHours(2),
                    OriginAddress      = "East Coast Sortation Facility - Hub A · Bay 12",
                    DestinationAddress = "158 W 23rd St, New York, NY 10011",
                    WeightKg           = 5.1,
                    RiskScore          = 82.0,
                    RiskLevel          = "Critical",
                    CustomerId         = c7.Id,
                    AssignedUserId     = primaryUser?.Id
                },
                new() {
                    TrackingNumber     = "NLX-073412",
                    Status             = "Dispatched",
                    ScheduledDelivery  = DateTime.UtcNow.AddHours(4),
                    OriginAddress      = "East Coast Sortation Facility - Hub A · R-501",
                    DestinationAddress = "88 Pine St, New York, NY 10005",
                    WeightKg           = 2.2,
                    RiskScore          = 35.0,
                    RiskLevel          = "Stable",
                    CustomerId         = c7.Id,
                    AssignedUserId     = primaryUser?.Id
                },

                // ── Hub 4: West Pacific Automated Logistics Depot ─────────────────
                new() {
                    TrackingNumber     = "NLX-062890",
                    Status             = "Conveyor jam delay",
                    ScheduledDelivery  = DateTime.UtcNow.AddMinutes(15),
                    OriginAddress      = "West Pacific Automated Logistics Depot · Belt C",
                    DestinationAddress = "1200 4th Ave, Seattle, WA 98101",
                    WeightKg           = 7.9,
                    RiskScore          = 92.0,
                    RiskLevel          = "Critical",
                    CustomerId         = c8.Id,
                    AssignedUserId     = primaryUser?.Id
                },
                new() {
                    TrackingNumber     = "NLX-062944",
                    Status             = "Out for delivery",
                    ScheduledDelivery  = DateTime.UtcNow.AddHours(1).AddMinutes(20),
                    OriginAddress      = "West Pacific Automated Logistics Depot · R-710",
                    DestinationAddress = "2101 7th Ave, Seattle, WA 98121",
                    WeightKg           = 4.6,
                    RiskScore          = 74.0,
                    RiskLevel          = "Moderate",
                    CustomerId         = c8.Id,
                    AssignedUserId     = primaryUser?.Id
                },
                new() {
                    TrackingNumber     = "NLX-063011",
                    Status             = "In transit",
                    ScheduledDelivery  = DateTime.UtcNow.AddHours(3).AddMinutes(45),
                    OriginAddress      = "West Pacific Automated Logistics Depot · R-718",
                    DestinationAddress = "400 Broad St, Seattle, WA 98109",
                    WeightKg           = 3.1,
                    RiskScore          = 28.0,
                    RiskLevel          = "Stable",
                    CustomerId         = c8.Id,
                    AssignedUserId     = primaryUser?.Id
                }
            };

            foreach (var ship in shipmentsToAdd)
            {
                if (!await db.Shipments.AnyAsync(s => s.TrackingNumber == ship.TrackingNumber))
                {
                    db.Shipments.Add(ship);
                }
            }
            await db.SaveChangesAsync();
        }
    }
}
