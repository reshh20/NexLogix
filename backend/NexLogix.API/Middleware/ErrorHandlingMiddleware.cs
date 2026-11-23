using System.Net;
using System.Text.Json;

namespace NexLogix.API.Middleware;

/// <summary>
/// Global error handler — catches all unhandled exceptions and returns
/// a consistent JSON error response instead of ASP.NET's HTML page.
/// </summary>
public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;

    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
    {
        _next   = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static Task HandleExceptionAsync(HttpContext context, Exception ex)
    {
        var (statusCode, message) = ex switch
        {
            UnauthorizedAccessException => (HttpStatusCode.Unauthorized,  ex.Message),
            InvalidOperationException   => (HttpStatusCode.Conflict,      ex.Message),
            ArgumentException           => (HttpStatusCode.BadRequest,    ex.Message),
            KeyNotFoundException        => (HttpStatusCode.NotFound,      ex.Message),
            _                           => (HttpStatusCode.InternalServerError,
                                            "An unexpected error occurred. Please try again.")
        };

        context.Response.ContentType = "application/json";
        context.Response.StatusCode  = (int)statusCode;

        var body = JsonSerializer.Serialize(new { message });
        return context.Response.WriteAsync(body);
    }
}
