using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NexLogix.API.Data;
using NexLogix.API.Models;
using Microsoft.EntityFrameworkCore;

namespace NexLogix.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class CustomersController : ControllerBase
{
    private readonly NexLogixDbContext _db;

    public CustomersController(NexLogixDbContext db)
    {
        _db = db;
    }

    /// <summary>Get all customers.</summary>
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var customers = await _db.Customers
            .OrderBy(c => c.Name)
            .ToListAsync();
        return Ok(customers);
    }

    /// <summary>Get a customer by ID including their shipments.</summary>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var customer = await _db.Customers
            .Include(c => c.Shipments)
            .FirstOrDefaultAsync(c => c.Id == id);

        if (customer is null) return NotFound(new { message = $"Customer {id} not found." });
        return Ok(customer);
    }

    /// <summary>Create a new customer.</summary>
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Customer customer)
    {
        customer.CreatedAt = DateTime.UtcNow;
        _db.Customers.Add(customer);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = customer.Id }, customer);
    }
}
