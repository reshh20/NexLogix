namespace NexLogix.API.DTOs.Auth;

public record LoginRequestDto(string Email, string Password);

public record RegisterRequestDto(
    string FullName,
    string Email,
    string Phone,
    string Password
);

public record AuthResponseDto(
    string Token,
    UserDto User
);

public record UserDto(
    int    Id,
    string FullName,
    string Email,
    string Role
);
