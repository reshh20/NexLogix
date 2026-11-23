using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NexLogix.API.Models;

[Table("Shipments")]
public class Shipment
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(50)]
    public string TrackingNumber { get; set; } = string.Empty;

    [MaxLength(50)]
    public string Status { get; set; } = "Pending"; // Pending | InTransit | Delivered | Exception

    public DateTime ScheduledDelivery { get; set; }
    public DateTime? ActualDelivery { get; set; }

    [MaxLength(255)]
    public string? OriginAddress { get; set; }

    [MaxLength(255)]
    public string? DestinationAddress { get; set; }

    public double? WeightKg { get; set; }

    // Risk prediction result (from ML service)
    public double? RiskScore { get; set; }

    [MaxLength(20)]
    public string? RiskLevel { get; set; } // Low | Medium | High

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Foreign keys
    public int CustomerId { get; set; }
    [ForeignKey(nameof(CustomerId))]
    public Customer Customer { get; set; } = null!;

    public int? AssignedUserId { get; set; }
    [ForeignKey(nameof(AssignedUserId))]
    public User? AssignedUser { get; set; }

    // Navigation
    public ICollection<DeliveryException> Exceptions { get; set; } = new List<DeliveryException>();
}
