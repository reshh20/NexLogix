using Microsoft.AspNetCore.Mvc;
using NexLogix.API.DTOs.Auth;
using NexLogix.API.Services;

namespace NexLogix.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    /// <summary>Authenticate an existing user and return a JWT.</summary>
    [HttpPost("login")]
    [ProducesResponseType(typeof(AuthResponseDto), 200)]
    [ProducesResponseType(401)]
    public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
    {
        try
        {
            var result = await _authService.LoginAsync(dto.Email, dto.Password);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
    }

    /// <summary>Register a new NexLogix user account.</summary>
    [HttpPost("register")]
    [ProducesResponseType(typeof(AuthResponseDto), 201)]
    [ProducesResponseType(400)]
    [ProducesResponseType(409)]
    public async Task<IActionResult> Register([FromBody] RegisterRequestDto dto)
    {
        try
        {
            var result = await _authService.RegisterAsync(
                dto.FullName, dto.Email, dto.Phone, dto.Password);
            return CreatedAtAction(nameof(Login), result);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }

    /// <summary>Trigger a password reset email.</summary>
    [HttpPost("forgot-password")]
    [ProducesResponseType(200)]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordDto dto)
    {
        await _authService.RequestPasswordResetAsync(dto.Email);
        return Ok(new { message = "If that email exists, a reset link has been sent." });
    }
}

// Inline DTO — only used here
public record ForgotPasswordDto(string Email);
