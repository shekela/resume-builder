using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Migrations
{
    /// <inheritdoc />
    public partial class AddSlugToExistingWorks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "WorkId",
                table: "Works",
                newName: "Slug");

            migrationBuilder.RenameColumn(
                name: "workId",
                table: "Gallery",
                newName: "WorkId");

            migrationBuilder.Sql(@"
        UPDATE Works
        SET Slug = LOWER(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Name, ' ', '-'), ',', ''), '.', ''), '''', ''), '""', ''))
        WHERE Slug IS NULL OR Slug = ''");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Slug",
                table: "Works",
                newName: "WorkId");

            migrationBuilder.RenameColumn(
                name: "WorkId",
                table: "Gallery",
                newName: "workId");
        }
    }
}
