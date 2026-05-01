using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BuckeyeMarketplace.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialSqlServer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ConfirmationNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrderDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShippingName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShippingAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShippingCity = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShippingState = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShippingZip = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Category = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SellerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PostedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CartItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    AddedDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CartItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CartItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    ProductId = table.Column<int>(type: "int", nullable: true),
                    ProductTitle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrderItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Category", "Description", "ImageUrl", "PostedDate", "Price", "SellerName", "Title" },
                values: new object[,]
                {
                    { 1, "Textbooks", "Used calculus textbook in good condition. Includes some notes but all pages intact.", "https://picsum.photos/300/400?random=1", new DateTime(2026, 1, 15, 0, 0, 0, 0, DateTimeKind.Unspecified), 65.00m, "Sarah Chen", "Calculus II Textbook (Larson, 11th Ed)" },
                    { 2, "Textbooks", "New condition, still in original packaging. Required for PSYCH 101.", "https://picsum.photos/300/400?random=2", new DateTime(2026, 1, 20, 0, 0, 0, 0, DateTimeKind.Unspecified), 95.50m, "Marcus Johnson", "Intro to Psychology 101 - Required Textbook" },
                    { 3, "Textbooks", "Good condition with minimal highlighting. Includes access code not used.", "https://picsum.photos/300/400?random=3", new DateTime(2026, 1, 22, 0, 0, 0, 0, DateTimeKind.Unspecified), 75.99m, "Emma Rodriguez", "Microeconomics: Principles & Applications Textbook" },
                    { 4, "OSU Clothing", "Authentic Ohio State hoodie. Worn a few times, excellent condition. Classic scarlet color.", "https://picsum.photos/300/400?random=4", new DateTime(2026, 2, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), 45.00m, "Alex Kim", "Official OSU Scarlet & Gray Hoodie - Size L" },
                    { 5, "OSU Clothing", "Adjustable cap with embroidered logo. Perfect condition, barely worn.", "https://picsum.photos/300/400?random=5", new DateTime(2026, 1, 28, 0, 0, 0, 0, DateTimeKind.Unspecified), 18.50m, "Jordan Lee", "OSU Buckeyes Baseball Cap - Gray" },
                    { 6, "Electronics", "Works perfectly. Includes original case and charging cable. Used for engineering courses.", "https://picsum.photos/300/400?random=6", new DateTime(2026, 1, 18, 0, 0, 0, 0, DateTimeKind.Unspecified), 85.00m, "Priya Patel", "TI-84 Plus Graphing Calculator" },
                    { 7, "Fan Gear", "Official replica jersey, worn once, like new. Perfect for game day or tailgate.", "https://picsum.photos/300/400?random=7", new DateTime(2026, 2, 5, 0, 0, 0, 0, DateTimeKind.Unspecified), 55.00m, "Tyler Brooks", "OSU Football Game Jersey - Treveyon #5" },
                    { 8, "Fan Gear", "Commemorative challenge coin with Brutus Buckeye. Great collectible for any student.", "https://picsum.photos/300/400?random=8", new DateTime(2026, 2, 3, 0, 0, 0, 0, DateTimeKind.Unspecified), 12.99m, "Casey Williams", "OSU Alumni Challenge Coin" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_ProductId",
                table: "CartItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_OrderId",
                table: "OrderItems",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_OrderItems_ProductId",
                table: "OrderItems",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CartItems");

            migrationBuilder.DropTable(
                name: "OrderItems");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
