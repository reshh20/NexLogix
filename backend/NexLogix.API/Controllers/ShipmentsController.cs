using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NexLogix.API.DTOs.Shipment;
using NexLogix.API.Services;
using System.Security.Claims;

namespace NexLogix.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ShipmentsController : ControllerBase
{
    private readonly IShipmentService _shipmentService;

    public ShipmentsController(IShipmentService shipmentService)
    {
        _shipmentService = shipmentService;
    }

    /// <summary>Get paginated list of shipments.</summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ShipmentDto>), 200)]
    public async Task<IActionResult> GetAll(
        [FromQuery] int    page     = 1,
        [FromQuery] int    pageSize = 20,
        [FromQuery] string? status  = null)
    {
        var shipments = await _shipmentService.GetShipmentsAsync(page, pageSize, status);
        return Ok(shipments);
    }

    /// <summary>Get a single shipment by ID.</summary>
    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(ShipmentDto), 200)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var shipment = await _shipmentService.GetByIdAsync(id);
            return Ok(shipment);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>Create a new shipment record.</summary>
    [HttpPost]
    [ProducesResponseType(typeof(ShipmentDto), 201)]
    public async Task<IActionResult> Create([FromBody] CreateShipmentDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
        var shipment = await _shipmentService.CreateAsync(dto, userId);
        return CreatedAtAction(nameof(GetById), new { id = shipment.Id }, shipment);
    }

    /// <summary>Update shipment status.</summary>
    [HttpPatch("{id:int}/status")]
    [ProducesResponseType(204)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        try
        {
            await _shipmentService.UpdateStatusAsync(id, dto.Status);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}

public record UpdateStatusDto(string Status);
