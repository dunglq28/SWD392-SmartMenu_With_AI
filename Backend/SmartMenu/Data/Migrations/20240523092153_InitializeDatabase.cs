using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SmartMenu.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitializeDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Brand",
                columns: table => new
                {
                    BrandID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BrandCode = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    BrandName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Brand__DAD4F3BE70E226A6", x => x.BrandID);
                });

            migrationBuilder.CreateTable(
                name: "CustomerVisit",
                columns: table => new
                {
                    CustomerVisitID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ImageCustomerUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageCustomerName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false),
                    SegmentID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__1DE5EEC1073D479D", x => x.CustomerVisitID);
                });

            migrationBuilder.CreateTable(
                name: "GroupAttribute",
                columns: table => new
                {
                    GroupAttributeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GroupAttributeName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__GroupAtt__2B6E4566D3469924", x => x.GroupAttributeID);
                });

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    CategoryID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryCode = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    CategoryName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false),
                    UpdateDate = table.Column<DateOnly>(type: "date", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    BrandID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Category__19093A2BBF15EADD", x => x.CategoryID);
                    table.ForeignKey(
                        name: "FK__Category__BrandI__3F466844",
                        column: x => x.BrandID,
                        principalTable: "Brand",
                        principalColumn: "BrandID");
                });

            migrationBuilder.CreateTable(
                name: "CustomerSegment",
                columns: table => new
                {
                    SegmentID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SegmentCode = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    SegmentName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false),
                    UpdateDate = table.Column<DateOnly>(type: "date", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    BrandID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Customer__C680609BB7D25D05", x => x.SegmentID);
                    table.ForeignKey(
                        name: "FK__CustomerS__Brand__46E78A0C",
                        column: x => x.BrandID,
                        principalTable: "Brand",
                        principalColumn: "BrandID");
                });

            migrationBuilder.CreateTable(
                name: "Menu",
                columns: table => new
                {
                    MenuID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MenuCode = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    BrandID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Menu__C99ED250059E30AB", x => x.MenuID);
                    table.ForeignKey(
                        name: "FK__Menu__BrandID__534D60F1",
                        column: x => x.BrandID,
                        principalTable: "Brand",
                        principalColumn: "BrandID");
                });

            migrationBuilder.CreateTable(
                name: "Store",
                columns: table => new
                {
                    StoreID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoreCode = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    UpdateDate = table.Column<DateOnly>(type: "date", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    City = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    BrandID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Store__3B82F0E16B33AA1D", x => x.StoreID);
                    table.ForeignKey(
                        name: "FK__Store__BrandID__3B75D760",
                        column: x => x.BrandID,
                        principalTable: "Brand",
                        principalColumn: "BrandID");
                });

            migrationBuilder.CreateTable(
                name: "Attribute",
                columns: table => new
                {
                    AttributeID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AttributeCode = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    AttributeName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false),
                    UpdateDate = table.Column<DateOnly>(type: "date", nullable: true),
                    GroupAttributeID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Attribut__C189298A89953090", x => x.AttributeID);
                    table.ForeignKey(
                        name: "FK__Attribute__Group__4CA06362",
                        column: x => x.GroupAttributeID,
                        principalTable: "GroupAttribute",
                        principalColumn: "GroupAttributeID");
                });

            migrationBuilder.CreateTable(
                name: "Product",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductCode = table.Column<string>(type: "nvarchar(36)", maxLength: 36, nullable: false),
                    CreateDate = table.Column<DateOnly>(type: "date", nullable: false),
                    ProductName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SpotlightVideo_ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpotlightVideo_ImageName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ImageName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryID = table.Column<int>(type: "int", nullable: false),
                    BrandID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Product__B40CC6EDE2BB1874", x => x.ProductID);
                    table.ForeignKey(
                        name: "FK__Product__Categor__4316F928",
                        column: x => x.CategoryID,
                        principalTable: "Category",
                        principalColumn: "CategoryID");
                });

            migrationBuilder.CreateTable(
                name: "MenuSegment",
                columns: table => new
                {
                    MenuID = table.Column<int>(type: "int", nullable: false),
                    SegmentID = table.Column<int>(type: "int", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__MenuSegm__65F6D459C6946D3B", x => new { x.MenuID, x.SegmentID });
                    table.ForeignKey(
                        name: "FK__MenuSegme__MenuI__5BE2A6F2",
                        column: x => x.MenuID,
                        principalTable: "Menu",
                        principalColumn: "MenuID");
                    table.ForeignKey(
                        name: "FK__MenuSegme__Segme__5CD6CB2B",
                        column: x => x.SegmentID,
                        principalTable: "CustomerSegment",
                        principalColumn: "SegmentID");
                });

            migrationBuilder.CreateTable(
                name: "Screen",
                columns: table => new
                {
                    ScreenID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StoreID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__Screen__0AB60F85BEF7FCFC", x => x.ScreenID);
                    table.ForeignKey(
                        name: "FK__Screen__StoreID__6383C8BA",
                        column: x => x.StoreID,
                        principalTable: "Store",
                        principalColumn: "StoreID");
                });

            migrationBuilder.CreateTable(
                name: "SegmentAttribute",
                columns: table => new
                {
                    SegmentID = table.Column<int>(type: "int", nullable: false),
                    AttributeID = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(125)", maxLength: 125, nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK__SegmentAt__Attri__4F7CD00D",
                        column: x => x.AttributeID,
                        principalTable: "Attribute",
                        principalColumn: "AttributeID");
                    table.ForeignKey(
                        name: "FK__SegmentAt__Segme__4E88ABD4",
                        column: x => x.SegmentID,
                        principalTable: "CustomerSegment",
                        principalColumn: "SegmentID");
                });

            migrationBuilder.CreateTable(
                name: "VisitAttribute",
                columns: table => new
                {
                    CustomerVisitID = table.Column<int>(type: "int", nullable: false),
                    AttributeID = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__VisitAtt__A1FD7C59CCC39901", x => new { x.CustomerVisitID, x.AttributeID });
                    table.ForeignKey(
                        name: "FK__VisitAttr__Attri__60A75C0F",
                        column: x => x.AttributeID,
                        principalTable: "Attribute",
                        principalColumn: "AttributeID");
                    table.ForeignKey(
                        name: "FK__VisitAttr__Custo__5FB337D6",
                        column: x => x.CustomerVisitID,
                        principalTable: "CustomerVisit",
                        principalColumn: "CustomerVisitID");
                });

            migrationBuilder.CreateTable(
                name: "ProductMenu",
                columns: table => new
                {
                    ProductID = table.Column<int>(type: "int", nullable: false),
                    MenuID = table.Column<int>(type: "int", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    DisplayIndex = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__ProductM__A8952BC8A90601A9", x => new { x.ProductID, x.MenuID });
                    table.ForeignKey(
                        name: "FK__ProductMe__MenuI__571DF1D5",
                        column: x => x.MenuID,
                        principalTable: "Menu",
                        principalColumn: "MenuID");
                    table.ForeignKey(
                        name: "FK__ProductMe__Produ__5629CD9C",
                        column: x => x.ProductID,
                        principalTable: "Product",
                        principalColumn: "ProductID");
                });

            migrationBuilder.CreateTable(
                name: "ScreenMenu",
                columns: table => new
                {
                    FromTime = table.Column<DateOnly>(type: "date", nullable: false),
                    ToTime = table.Column<DateOnly>(type: "date", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ScreenID = table.Column<int>(type: "int", nullable: false),
                    MenuID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK__ScreenMen__MenuI__66603565",
                        column: x => x.MenuID,
                        principalTable: "Menu",
                        principalColumn: "MenuID");
                    table.ForeignKey(
                        name: "FK__ScreenMen__Scree__656C112C",
                        column: x => x.ScreenID,
                        principalTable: "Screen",
                        principalColumn: "ScreenID");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_GroupAttributeID",
                table: "Attribute",
                column: "GroupAttributeID");

            migrationBuilder.CreateIndex(
                name: "UQ__Attribut__BD3ED16E6C732899",
                table: "Attribute",
                column: "AttributeCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "UQ__Brand__44292CC75B7D16E0",
                table: "Brand",
                column: "BrandCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Category_BrandID",
                table: "Category",
                column: "BrandID");

            migrationBuilder.CreateIndex(
                name: "UQ__Category__371BA955E99614AD",
                table: "Category",
                column: "CategoryCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CustomerSegment_BrandID",
                table: "CustomerSegment",
                column: "BrandID");

            migrationBuilder.CreateIndex(
                name: "UQ__Customer__4A834E881EA0AED9",
                table: "CustomerSegment",
                column: "SegmentCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Menu_BrandID",
                table: "Menu",
                column: "BrandID");

            migrationBuilder.CreateIndex(
                name: "UQ__Menu__868A3A730E6598F6",
                table: "Menu",
                column: "MenuCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MenuSegment_SegmentID",
                table: "MenuSegment",
                column: "SegmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Product_CategoryID",
                table: "Product",
                column: "CategoryID");

            migrationBuilder.CreateIndex(
                name: "UQ__Product__2F4E024FCEE9DA0B",
                table: "Product",
                column: "ProductCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductMenu_MenuID",
                table: "ProductMenu",
                column: "MenuID");

            migrationBuilder.CreateIndex(
                name: "IX_Screen_StoreID",
                table: "Screen",
                column: "StoreID");

            migrationBuilder.CreateIndex(
                name: "IX_ScreenMenu_MenuID",
                table: "ScreenMenu",
                column: "MenuID");

            migrationBuilder.CreateIndex(
                name: "IX_ScreenMenu_ScreenID",
                table: "ScreenMenu",
                column: "ScreenID");

            migrationBuilder.CreateIndex(
                name: "IX_SegmentAttribute_AttributeID",
                table: "SegmentAttribute",
                column: "AttributeID");

            migrationBuilder.CreateIndex(
                name: "IX_SegmentAttribute_SegmentID",
                table: "SegmentAttribute",
                column: "SegmentID");

            migrationBuilder.CreateIndex(
                name: "IX_Store_BrandID",
                table: "Store",
                column: "BrandID");

            migrationBuilder.CreateIndex(
                name: "UQ__Store__02A384F87841C4D5",
                table: "Store",
                column: "StoreCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_VisitAttribute_AttributeID",
                table: "VisitAttribute",
                column: "AttributeID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MenuSegment");

            migrationBuilder.DropTable(
                name: "ProductMenu");

            migrationBuilder.DropTable(
                name: "ScreenMenu");

            migrationBuilder.DropTable(
                name: "SegmentAttribute");

            migrationBuilder.DropTable(
                name: "VisitAttribute");

            migrationBuilder.DropTable(
                name: "Product");

            migrationBuilder.DropTable(
                name: "Menu");

            migrationBuilder.DropTable(
                name: "Screen");

            migrationBuilder.DropTable(
                name: "CustomerSegment");

            migrationBuilder.DropTable(
                name: "Attribute");

            migrationBuilder.DropTable(
                name: "CustomerVisit");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.DropTable(
                name: "Store");

            migrationBuilder.DropTable(
                name: "GroupAttribute");

            migrationBuilder.DropTable(
                name: "Brand");
        }
    }
}
