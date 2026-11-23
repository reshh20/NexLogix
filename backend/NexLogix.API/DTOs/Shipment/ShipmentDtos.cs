namespace NexLogix.API.DTOs.Shipment;

public record ShipmentDto(
    int      Id,
    string   TrackingNumber,
    string   Status,
    DateTime ScheduledDelivery,
    DateTime? ActualDelivery,
    string?  OriginAddress,
    string?  DestinationAddress,
    double?  WeightKg,
    double?  RiskScore,
    string?  RiskLevel,
    int      CustomerId,
    string   CustomerName
);

public record CreateShipmentDto(
    string   TrackingNumber,
    DateTime ScheduledDelivery,
    string?  OriginAddress,
    string?  DestinationAddress,
    double?  WeightKg,
    int      CustomerId
);
