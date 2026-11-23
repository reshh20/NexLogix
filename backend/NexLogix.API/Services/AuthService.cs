using NexLogix.API.Data;
using NexLogix.API.DTOs.Auth;
using NexLogix.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;

namespace NexLogix.API.Services;

public class AuthService : IAuthService
{
    private readonly NexLogixDbContext _db;
    private readonly IConfiguration    _config;

    public AuthService(NexLogixDbContext db, IConfiguration config)
    {
        _db     = db;
        _config = config;
    }

    // ── Login ─────────────────────────────────────────────────────────────────

    public async Task<AuthResponseDto> LoginAsync(string email, string password)
    {
        // 1. Normalise email
        email = email.Trim().ToLowerInvariant();

        // 2. Look up user — always use the same generic error to prevent user enumeration
        var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user is null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            throw new UnauthorizedAccessException("Invalid email or password.");

        // 3. Stamp last login
        user.LastLoginAt = DateTime.UtcNow;
        await _db.SaveChangesAsync();

        return BuildAuthResponse(user);
    }

    // ── Register ──────────────────────────────────────────────────────────────

    public async Task<AuthResponseDto> RegisterAsync(
        string fullName, string email, string phone, string password)
    {
        // 1. Normalise
        email    = email.Trim().ToLowerInvariant();
        fullName = fullName.Trim();
        phone    = phone.Trim();

        // 2. Validate inputs
        ValidateRegistrationInputs(fullName, email, phone, password);

        // 3. Check duplicate email
        if (await _db.Users.AnyAsync(u => u.Email == email))
            throw new InvalidOperationException("An account with this email already exists.");

        // 4. Hash password with BCrypt (work factor 12)
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(password, workFactor: 12);

        // 5. Persist
        var user = new User
        {
            FullName     = fullName,
            Email        = email,
            Phone        = phone,
            PasswordHash = passwordHash,
            Role         = "Operator",
            CreatedAt    = DateTime.UtcNow,
            LastLoginAt  = DateTime.UtcNow,
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync();

        return BuildAuthResponse(user);
    }

    // ── Password Reset (stub — email delivery wired separately) ───────────────

    public Task RequestPasswordResetAsync(string email)
    {
        // TODO: generate a secure reset token, store it with an expiry,
        //       and send via AWS SES / SMTP
        return Task.CompletedTask;
    }

    // ── Private Helpers ───────────────────────────────────────────────────────

    private static void ValidateRegistrationInputs(
        string fullName, string email, string phone, string password)
    {
        if (string.IsNullOrWhiteSpace(fullName) || fullName.Length < 2)
            throw new ArgumentException("Full name must be at least 2 characters.");

        if (string.IsNullOrWhiteSpace(email) || !email.Contains('@'))
            throw new ArgumentException("A valid email address is required.");

        if (string.IsNullOrWhiteSpace(phone))
            throw new ArgumentException("Phone number is required.");

        if (string.IsNullOrWhiteSpace(password) || password.Length < 8)
            throw new ArgumentException("Password must be at least 8 characters.");

        // Enforce at least one uppercase, one digit, one special character
        if (!password.Any(char.IsUpper))
            throw new ArgumentException("Password must contain at least one uppercase letter.");

        if (!password.Any(char.IsDigit))
            throw new ArgumentException("Password must contain at least one number.");

        if (!password.Any(c => !char.IsLetterOrDigit(c)))
            throw new ArgumentException("Password must contain at least one special character.");
    }

    private AuthResponseDto BuildAuthResponse(User user)
    {
        var token = GenerateJwt(user);
        return new AuthResponseDto(
            Token: token,
            User: new UserDto(user.Id, user.FullName, user.Email, user.Role)
        );
    }

    private string GenerateJwt(User user)
    {
        var secret   = _config["Jwt:Secret"]
            ?? throw new InvalidOperationException("JWT secret is not configured.");
        var issuer   = _config["Jwt:Issuer"]   ?? "NexLogix";
        var audience = _config["Jwt:Audience"] ?? "NexLogixClient";
        var expiry   = int.TryParse(_config["Jwt:ExpiryMinutes"], out var e) ? e : 43200;

        if (secret.Length < 32)
            throw new InvalidOperationException("JWT secret must be at least 32 characters.");

        var key   = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub,   user.Id.ToString()),
            new(JwtRegisteredClaimNames.Email, user.Email),
            new(JwtRegisteredClaimNames.Name,  user.FullName),
            new(ClaimTypes.Role,               user.Role),
            new(JwtRegisteredClaimNames.Jti,   Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Iat,
                DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString(),
                ClaimValueTypes.Integer64),
        };

        var token = new JwtSecurityToken(
            issuer:             issuer,
            audience:           audience,
            claims:             claims,
            notBefore:          DateTime.UtcNow,
            expires:            DateTime.UtcNow.AddMinutes(expiry),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
