using Microsoft.EntityFrameworkCore.Migrations;

namespace Split_payment.Migrations
{
    public partial class AddAppartmentsAndInvoices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApartmentId",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "LivingArea",
                table: "Users",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Apartments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    City = table.Column<string>(nullable: true),
                    Street = table.Column<string>(nullable: true),
                    HouseNo = table.Column<string>(nullable: true),
                    ApartmentNo = table.Column<string>(nullable: true),
                    Area = table.Column<double>(nullable: false),
                    RentPrice = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Apartments", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Invoice",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceNo = table.Column<string>(nullable: true),
                    Rent = table.Column<double>(nullable: false),
                    Electricity = table.Column<double>(nullable: false),
                    UtilityPayment = table.Column<double>(nullable: false),
                    Heating = table.Column<double>(nullable: false),
                    SumToPay = table.Column<double>(nullable: false),
                    UserId = table.Column<int>(nullable: true),
                    ApartmentId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invoice_Apartments_ApartmentId",
                        column: x => x.ApartmentId,
                        principalTable: "Apartments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Invoice_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_ApartmentId",
                table: "Users",
                column: "ApartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_ApartmentId",
                table: "Invoice",
                column: "ApartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_UserId",
                table: "Invoice",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Apartments_ApartmentId",
                table: "Users",
                column: "ApartmentId",
                principalTable: "Apartments",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Apartments_ApartmentId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Invoice");

            migrationBuilder.DropTable(
                name: "Apartments");

            migrationBuilder.DropIndex(
                name: "IX_Users_ApartmentId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ApartmentId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "LivingArea",
                table: "Users");
        }
    }
}
