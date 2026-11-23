using NexLogix.API.DTOs.Auth;

namespace NexLogix.API.Services;

public interface IAuthService
{
    Task<AuthResponseDto> LoginAsync(string email, string password);
    Task<AuthResponseDto> RegisterAsync(string fullName, string email, string phone, string password);
    Task RequestPasswordResetAsync(string email);
}
