CREATE DATABASE [SmartMenu];
GO

USE [SmartMenu];
GO

CREATE TABLE Brand
(
  BrandID INT NOT NULL IDENTITY(1,1),
  BrandCode NVARCHAR(36) NOT NULL UNIQUE,
  BrandName NVARCHAR(100) NOT NULL,
  CreateDate DATE NOT NULL,
  Status INT NOT NULL,
  ImageUrl NVARCHAR(MAX) NULL,
  ImageName NVARCHAR(100) NULL,
  PRIMARY KEY (BrandID)
);

CREATE TABLE Store
(
  StoreID INT NOT NULL IDENTITY(1,1),
  StoreCode NVARCHAR(36) NOT NULL UNIQUE,
  CreateDate DATE NOT NULL,
  IsActive BIT NOT NULL,
  UpdateDate DATE NULL,
  Status INT NOT NULL,
  Address NVARCHAR(150) NOT NULL,
  City NVARCHAR(150) NOT NULL,
  BrandID INT NOT NULL,
  PRIMARY KEY (StoreID),
  FOREIGN KEY (BrandID) REFERENCES Brand(BrandID)
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


-- Chèn thông tin mẫu vào bảng Brand
INSERT INTO Brand (BrandCode, BrandName, CreateDate, Status, ImageUrl, ImageName)
VALUES 
('BRC-001', 'Brand One', '2023-01-01', 1, 'http://example.com/images/brand1.jpg', 'brand1.jpg'),
('BRC-002', 'Brand Two', '2023-02-01', 1, 'http://example.com/images/brand2.jpg', 'brand2.jpg'),
('BRC-003', 'Brand Three', '2023-03-01', 0, NULL, NULL),
('BRC-004', 'Brand Four', '2023-04-01', 1, 'http://example.com/images/brand4.jpg', 'brand4.jpg'),
('BRC-005', 'Brand Five', '2023-05-01', 1, NULL, NULL);
