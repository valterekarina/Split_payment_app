using Microsoft.EntityFrameworkCore.Migrations;

namespace Split_payment.Migrations
{
    public partial class UpdateApartmentAddRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Relation",
                table: "Apartments",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Relation",
                table: "Apartments");
        }
    }
}
