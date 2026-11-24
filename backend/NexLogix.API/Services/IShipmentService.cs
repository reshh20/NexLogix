using NexLogix.API.DTOs.Shipment;

namespace NexLogix.API.Services;

public interface IShipmentService
{
    Task<IEnumerable<ShipmentDto>> GetShipmentsAsync(int page, int pageSize, string? status, string? hub = null);
    Task<ShipmentDto>              GetByIdAsync(int id);
    Task<ShipmentDto>              CreateAsync(CreateShipmentDto dto, int userId);
    Task                           UpdateStatusAsync(int id, string status);
}
