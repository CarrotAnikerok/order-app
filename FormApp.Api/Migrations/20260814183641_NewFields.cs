using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FormApp.Api.Migrations
{
    /// <inheritdoc />
    public partial class NewFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Date",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldMaxLength: 50);

            migrationBuilder.AddColumn<string>(
                name: "Number",
                table: "Orders",
                type: "TEXT",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Orders");

            migrationBuilder.AlterColumn<int>(
                name: "Date",
                table: "Orders",
                type: "INTEGER",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT");
        }
    }
}
