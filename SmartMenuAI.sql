CREATE DATABASE [SmartMenu];
GO

USE [SmartMenu];
GO

CREATE TABLE Role
(
  RoleID INT NOT NULL IDENTITY(1,1),
  RoleName VARCHAR(50) NOT NULL,
  PRIMARY KEY (RoleID)
);

CREATE TABLE AppUser
(
  UserID INT NOT NULL IDENTITY(1,1),
  UserCode NVARCHAR(36) NOT NULL UNIQUE,
  UserName VARCHAR(50) NOT NULL,
  Password VARCHAR(255) NOT NULL,
  RoleID INT NOT NULL,
  CreateDate DATE NOT NULL,
  IsActive BIT NOT NULL,
  Status INT NOT NULL,
  PRIMARY KEY (UserID),
  FOREIGN KEY (RoleID) REFERENCES Role(RoleID)
);

CREATE TABLE RefreshToken
(
  RefreshTokenID INT NOT NULL IDENTITY(1,1),
  RefreshTokenCode NVARCHAR(36) NOT NULL UNIQUE,
  RefreshTokenValue NVARCHAR(255) NOT NULL,
  UserID INT NOT NULL,
  JwtID NVARCHAR(150) NOT NULL,
  IsUsed BIT NULL,
  IsRevoked BIT NULL,
  ExpiresAt DATETIME NOT NULL,
  CreatedAt DATETIME NOT NULL,
  PRIMARY KEY (RefreshTokenID),
  FOREIGN KEY (UserID) REFERENCES AppUser(UserID)
);

CREATE TABLE Brand
(
  BrandID INT NOT NULL IDENTITY(1,1),
  BrandCode NVARCHAR(36) NOT NULL UNIQUE,
  BrandName NVARCHAR(100) NOT NULL,
  UserID INT NOT NULL,
  CreateDate DATE NOT NULL,
  Status INT NOT NULL,
  ImageUrl NVARCHAR(MAX) NULL,
  ImageName NVARCHAR(100) NULL,
  PRIMARY KEY (BrandID),
  FOREIGN KEY (UserID) REFERENCES AppUser(UserID)
);

CREATE TABLE Store
(
  StoreID INT NOT NULL IDENTITY(1,1),
  StoreCode NVARCHAR(36) NOT NULL UNIQUE,
  UserID INT NOT NULL,
  CreateDate DATE NOT NULL,
  IsActive BIT NOT NULL,
  UpdateDate DATE NULL,
  Status INT NOT NULL,
  Address NVARCHAR(150) NOT NULL,
  City NVARCHAR(150) NOT NULL,
  BrandID INT NOT NULL,
  PRIMARY KEY (StoreID),
  FOREIGN KEY (BrandID) REFERENCES Brand(BrandID),
  FOREIGN KEY (UserID) REFERENCES AppUser(UserID)
);


CREATE TABLE Category
(
  CategoryID INT NOT NULL IDENTITY(1,1),
  CategoryCode NVARCHAR(36) NOT NULL UNIQUE,
  CategoryName NVARCHAR(50) NOT NULL,
  CreateDate DATE NOT NULL,
  UpdateDate DATE NULL,
  Status INT NOT NULL,
  BrandID INT NOT NULL,
  PRIMARY KEY (CategoryID),
  FOREIGN KEY (BrandID) REFERENCES Brand(BrandID)
);

CREATE TABLE Product
(
  ProductID INT NOT NULL IDENTITY(1,1),
  ProductCode NVARCHAR(36) NOT NULL UNIQUE,
  CreateDate DATE NOT NULL,
  ProductName NVARCHAR(200) NOT NULL,
  SpotlightVideo_ImageUrl NVARCHAR(MAX) NULL,
  SpotlightVideo_ImageName NVARCHAR(200) NULL,
  ImageUrl NVARCHAR(MAX) NULL,
  ImageName NVARCHAR(200) NULL,
  Description NVARCHAR(MAX) NULL,
  CategoryID INT NOT NULL,
  BrandID INT NOT NULL,
  PRIMARY KEY (ProductID),
  FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID),
);

CREATE TABLE CustomerSegment
(
  SegmentID INT NOT NULL IDENTITY(1,1),
  SegmentCode NVARCHAR(36) NOT NULL UNIQUE,
  SegmentName NVARCHAR(MAX) NOT NULL,
  CreateDate DATE NOT NULL,
  UpdateDate DATE NULL,
  Status INT NOT NULL,
  BrandID INT NOT NULL,
  PRIMARY KEY (SegmentID),
  FOREIGN KEY (BrandID) REFERENCES Brand(BrandID)
);

CREATE TABLE GroupAttribute
(
  GroupAttributeID INT NOT NULL IDENTITY(1,1),
  GroupAttributeName NVARCHAR(100) NOT NULL,
  CreateDate DATE NOT NULL,
  PRIMARY KEY (GroupAttributeID)
);

CREATE TABLE Attribute
(
  AttributeID INT NOT NULL IDENTITY(1,1),
  AttributeCode NVARCHAR(36) NOT NULL UNIQUE,
  AttributeName NVARCHAR(100) NOT NULL,
  Description NVARCHAR(MAX) NULL,
  Status INT NOT NULL,
  CreateDate DATE NOT NULL,
  UpdateDate DATE NULL,
  GroupAttributeID INT NOT NULL,
  PRIMARY KEY (AttributeID),
  FOREIGN KEY (GroupAttributeID) REFERENCES GroupAttribute(GroupAttributeID)
);

CREATE TABLE SegmentAttribute
(
  SegmentID INT NOT NULL,
  AttributeID INT NOT NULL,
  Value NVARCHAR(125) NOT NULL,
  FOREIGN KEY (SegmentID) REFERENCES CustomerSegment(SegmentID),
  FOREIGN KEY (AttributeID) REFERENCES Attribute(AttributeID)
);

CREATE TABLE Menu
(
  MenuID INT NOT NULL IDENTITY(1,1),
  MenuCode NVARCHAR(36) NOT NULL UNIQUE,
  CreateDate DATE NOT NULL,
  IsActive BIT NOT NULL,
  BrandID INT NOT NULL,
  PRIMARY KEY (MenuID),
  FOREIGN KEY (BrandID) REFERENCES Brand(BrandID)
);

CREATE TABLE ProductMenu
(
  Price INT NOT NULL,
  ProductID INT NOT NULL,
  MenuID INT NOT NULL,
  DisplayIndex int NULL,
  PRIMARY KEY (ProductID, MenuID),
  FOREIGN KEY (ProductID) REFERENCES Product(ProductID),
  FOREIGN KEY (MenuID) REFERENCES Menu(MenuID)
);

CREATE TABLE CustomerVisit
(
  CustomerVisitID INT NOT NULL IDENTITY(1,1),
  ImageCustomerUrl NVARCHAR(MAX) NOT NULL,
  ImageCustomerName NVARCHAR(200) NOT NULL,
  CreateDate DATE NOT NULL,
  SegmentID INT NULL,
  PRIMARY KEY (CustomerVisitID),
);

CREATE TABLE MenuSegment
(
  Priority INT NOT NULL,
  MenuID INT NOT NULL,
  SegmentID INT NOT NULL,
  PRIMARY KEY (MenuID, SegmentID),
  FOREIGN KEY (MenuID) REFERENCES Menu(MenuID),
  FOREIGN KEY (SegmentID) REFERENCES CustomerSegment(SegmentID)
);

CREATE TABLE VisitAttribute
(
  CustomerVisitID INT NOT NULL,
  AttributeID INT NOT NULL,
  Value NVARCHAR(200) NOT NULL,
  PRIMARY KEY (CustomerVisitID, AttributeID),
  FOREIGN KEY (CustomerVisitID) REFERENCES CustomerVisit(CustomerVisitID),
  FOREIGN KEY (AttributeID) REFERENCES Attribute(AttributeID)
);

CREATE TABLE Screen
(
  ScreenID INT NOT NULL IDENTITY(1,1),
  StoreID INT NOT NULL,
  PRIMARY KEY (ScreenID),
  FOREIGN KEY (StoreID) REFERENCES Store(StoreID)
);

CREATE TABLE ScreenMenu
(
  FromTime DATE NOT NULL,
  ToTime DATE NOT NULL,
  Status INT NOT NULL,
  ScreenID INT NOT NULL,
  MenuID INT NOT NULL,
  FOREIGN KEY (ScreenID) REFERENCES Screen(ScreenID),
  FOREIGN KEY (MenuID) REFERENCES Menu(MenuID)
);

-- Thông tin ảo cho bảng Role
INSERT INTO Role (RoleName) VALUES ('Admin');
INSERT INTO Role (RoleName) VALUES ('Brand Manager');
INSERT INTO Role (RoleName) VALUES ('Store');

-- Thông tin ảo cho bảng AppUser
INSERT INTO AppUser (UserCode, UserName, Password, RoleID, CreateDate, IsActive, Status) VALUES 
('9e2a9c0a-3f94-4b6a-8ef2-123456789012', 'admin', 'password123', 1, '2024-01-01', 1, 1),
('e3c3d1f1-8b8f-4b6a-bc2e-234567890123', 'brand manager', 'password232', 2, '2024-01-02', 1, 1),
('f3a5c4d7-9d8e-4e4b-bd3f-345678901234', 'brand manager', 'hello123', 2, '2024-01-03', 1, 1),
('d6e6f7c5-6e7a-4e9b-af4d-456789012345', 'brand manager', 'sailamcuocdoi', 2, '2024-01-04', 1, 1);


-- Thông tin ảo cho bảng Brand
INSERT INTO Brand (BrandCode, BrandName, UserID, CreateDate, Status, ImageUrl, ImageName) VALUES 
('b1234567-89ab-cdef-0123-456789abcdef', N'Phúc Long', 2, '2024-02-01', 1, NULL, NULL),
('c2345678-9abc-def0-1234-56789abcdef0', N'Cộng', 3, '2024-02-02', 1, NULL, NULL),
('d3456789-abcd-ef01-2345-6789abcdef01', N'Highlands', 4, '2024-02-03', 1, NULL, NULL);

select * from AppUser

select * from RefreshToken

update AppUser 
set IsActive = 1
where UserCode = '9e2a9c0a-3f94-4b6a-8ef2-123456789012'