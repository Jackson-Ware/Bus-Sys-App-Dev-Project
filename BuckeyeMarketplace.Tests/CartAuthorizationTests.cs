using System.Net;
using BuckeyeMarketplace.API.Data;
using Xunit;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BuckeyeMarketplace.Tests;

public class BuckeyeMarketplaceFactory : WebApplicationFactory<Program>
{
    private readonly SqliteConnection _connection;

    public BuckeyeMarketplaceFactory()
    {
        _connection = new SqliteConnection("Data Source=:memory:");
        _connection.Open();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration((_, config) =>
        {
            config.AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["Jwt:Key"] = "super-secret-test-key-at-least-32-characters-long!",
                ["Jwt:Issuer"] = "BuckeyeMarketplace",
                ["Jwt:Audience"] = "BuckeyeMarketplace",
                ["Seed:AdminPassword"] = "TestAdmin123!",
            });
        });

        builder.ConfigureServices(services =>
        {
            // Replace the production DbContext with one backed by a shared in-memory SQLite
            // connection so that db.Database.Migrate() in Program.cs runs successfully.
            var descriptors = services
                .Where(d => d.ServiceType == typeof(DbContextOptions<AppDbContext>))
                .ToList();
            foreach (var d in descriptors)
                services.Remove(d);

            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(_connection));
        });
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);
        if (disposing)
            _connection.Dispose();
    }
}

public class CartAuthorizationTests : IClassFixture<BuckeyeMarketplaceFactory>
{
    private readonly HttpClient _client;

    public CartAuthorizationTests(BuckeyeMarketplaceFactory factory)
    {
        _client = factory.CreateClient(new WebApplicationFactoryClientOptions
        {
            AllowAutoRedirect = false
        });
    }

    [Fact]
    public async Task GetCart_WithoutToken_Returns401Unauthorized()
    {
        var response = await _client.GetAsync("/api/cart");

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }
}
