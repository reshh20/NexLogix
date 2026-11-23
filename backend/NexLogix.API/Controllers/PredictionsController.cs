using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace NexLogix.API.Controllers;

/// <summary>
/// Proxies delivery risk prediction requests to the Python FastAPI ML service.
/// The C# API is the single entry point for the React frontend.
/// </summary>
[Authorize]
[ApiController]
[Route("api/[controller]")]
public class PredictionsController : ControllerBase
{
    private readonly IHttpClientFactory _httpFactory;

    public PredictionsController(IHttpClientFactory httpFactory)
    {
        _httpFactory = httpFactory;
    }

    /// <summary>Get delivery risk prediction for a shipment.</summary>
    [HttpGet("{shipmentId:int}")]
    public async Task<IActionResult> GetPrediction(int shipmentId)
    {
        try
        {
            var client   = _httpFactory.CreateClient("MLService");
            var response = await client.GetAsync($"/predict/{shipmentId}");

            if (!response.IsSuccessStatusCode)
                return StatusCode((int)response.StatusCode,
                    new { message = "ML service returned an error." });

            var result = await response.Content.ReadAsStringAsync();
            return Content(result, "application/json");
        }
        catch (HttpRequestException)
        {
            return ServiceUnavailable(new { message = "ML prediction service is currently unavailable." });
        }
    }

    private ObjectResult ServiceUnavailable(object value) =>
        StatusCode(503, value);
}
