using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NexLogix.API.Models;

[Table("DeliveryExceptions")]
public class DeliveryException
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(100)]
    public string ExceptionType { get; set; } = string.Empty; // Delay | Damage | Lost | Weather

    [MaxLength(1000)]
    public string? Description { get; set; }

    [MaxLength(50)]
    public string Status { get; set; } = "Open"; // Open | Resolved | Escalated

    // S3 key for uploaded evidence file
    [MaxLength(500)]
    public string? EvidenceFileKey { get; set; }

    public DateTime ReportedAt { get; set; } = DateTime.UtcNow;
    public DateTime? ResolvedAt { get; set; }

    // Foreign key
    public int ShipmentId { get; set; }
    [ForeignKey(nameof(ShipmentId))]
    public Shipment Shipment { get; set; } = null!;
}
