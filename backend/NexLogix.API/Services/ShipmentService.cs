using NexLogix.API.Data;
using NexLogix.API.DTOs.Shipment;
using NexLogix.API.Models;
using Microsoft.EntityFrameworkCore;

namespace NexLogix.API.Services;

public class ShipmentService : IShipmentService
{
    private readonly NexLogixDbContext _db;

    public ShipmentService(NexLogixDbContext db)
    {
        _db = db;
    }

    public async Task<IEnumerable<ShipmentDto>> GetShipmentsAsync(int page, int pageSize, string? status, string? hub = null)
    {
        var query = _db.Shipments
            .Include(s => s.Customer)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
            query = query.Where(s => s.Status == status);

        if (!string.IsNullOrWhiteSpace(hub))
            query = query.Where(s => s.OriginAddress != null && s.OriginAddress.Contains(hub));

        return await query
            .OrderByDescending(s => s.RiskScore)
            .ThenByDescending(s => s.CreatedAt)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(s => ToDto(s))
            .ToListAsync();
    }

    public async Task<ShipmentDto> GetByIdAsync(int id)
    {
        var shipment = await _db.Shipments
            .Include(s => s.Customer)
            .FirstOrDefaultAsync(s => s.Id == id)
            ?? throw new KeyNotFoundException($"Shipment {id} not found.");

        return ToDto(shipment);
    }

    public async Task<ShipmentDto> CreateAsync(CreateShipmentDto dto, int userId)
    {
        var shipment = new Shipment
        {
            TrackingNumber     = dto.TrackingNumber,
            ScheduledDelivery  = dto.ScheduledDelivery,
            OriginAddress      = dto.OriginAddress,
            DestinationAddress = dto.DestinationAddress,
            WeightKg           = dto.WeightKg,
            CustomerId         = dto.CustomerId,
            AssignedUserId     = userId,
            Status             = "Pending"
        };

        _db.Shipments.Add(shipment);
        await _db.SaveChangesAsync();

        return await GetByIdAsync(shipment.Id);
    }

    public async Task UpdateStatusAsync(int id, string status)
    {
        var shipment = await _db.Shipments.FindAsync(id)
            ?? throw new KeyNotFoundException($"Shipment {id} not found.");

        shipment.Status = status;
        if (status == "Delivered") shipment.ActualDelivery = DateTime.UtcNow;

        await _db.SaveChangesAsync();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private static ShipmentDto ToDto(Shipment s) => new(
        s.Id, s.TrackingNumber, s.Status, s.ScheduledDelivery,
        s.ActualDelivery, s.OriginAddress, s.DestinationAddress,
        s.WeightKg, s.RiskScore, s.RiskLevel,
        s.CustomerId, s.Customer?.Name ?? string.Empty
    );
}
