using System.Security.Claims;
using BuckeyeMarketplace.API.Controllers;
using Xunit;
using BuckeyeMarketplace.API.Data;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BuckeyeMarketplace.Tests;

public class CartControllerUnitTests : IDisposable
{
    private readonly AppDbContext _context;
    private readonly CartController _controller;

    public CartControllerUnitTests()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;

        _context = new AppDbContext(options);

        var httpContext = new DefaultHttpContext
        {
            User = new ClaimsPrincipal(new ClaimsIdentity(
                new[] { new Claim(ClaimTypes.NameIdentifier, "test-user-1") },
                "TestScheme"))
        };

        _controller = new CartController(_context)
        {
            ControllerContext = new ControllerContext { HttpContext = httpContext }
        };
    }

    public void Dispose() => _context.Dispose();

    [Fact]
    public async Task AddToCart_QuantityBelowOne_ReturnsBadRequest()
    {
        var request = new AddToCartRequest(ProductId: 1, Quantity: 0);

        var result = await _controller.AddToCart(request);

        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }

    [Fact]
    public async Task AddToCart_ProductDoesNotExist_ReturnsNotFound()
    {
        var request = new AddToCartRequest(ProductId: 9999, Quantity: 1);

        var result = await _controller.AddToCart(request);

        result.Result.Should().BeOfType<NotFoundObjectResult>();
    }

    [Fact]
    public async Task UpdateQuantity_QuantityBelowOne_ReturnsBadRequest()
    {
        var request = new UpdateQuantityRequest(Quantity: 0);

        var result = await _controller.UpdateQuantity(cartItemId: 1, request);

        result.Result.Should().BeOfType<BadRequestObjectResult>();
    }
}
