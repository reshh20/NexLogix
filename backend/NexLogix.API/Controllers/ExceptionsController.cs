using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NexLogix.API.Data;
using NexLogix.API.Models;
using Microsoft.EntityFrameworkCore;

namespace NexLogix.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ExceptionsController : ControllerBase
{
    private readonly NexLogixDbContext _db;

    public ExceptionsController(NexLogixDbContext db)
    {
        _db = db;
    }

    /// <summary>Get all delivery exceptions, optionally filtered by status.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? status = null)
    {
        var query = _db.DeliveryExceptions
            .Include(e => e.Shipment)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(status))
            query = query.Where(e => e.Status == status);

        var exceptions = await query
            .OrderByDescending(e => e.ReportedAt)
            .ToListAsync();

        return Ok(exceptions);
    }

    /// <summary>Report a new delivery exception.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] DeliveryException exception)
    {
        exception.ReportedAt = DateTime.UtcNow;
        exception.Status     = "Open";
        _db.DeliveryExceptions.Add(exception);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), exception);
    }

    /// <summary>Resolve an exception.</summary>
    [HttpPatch("{id:int}/resolve")]
    public async Task<IActionResult> Resolve(int id)
    {
        var exception = await _db.DeliveryExceptions.FindAsync(id);
        if (exception is null) return NotFound(new { message = $"Exception {id} not found." });

        exception.Status     = "Resolved";
        exception.ResolvedAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return NoContent();
    }
}
