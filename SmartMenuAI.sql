Use [master]

Drop DATABASE [SmartMenu]
GO

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
  Fullname NVARCHAR(50),
  Phone VARCHAR(12),
  Dob DATE,
  Gender VARCHAR(6),
  UpdateBy INT,
  UpdateDate DATE,
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

-- thông tin ảo cho appUser

-- Thông tin ảo cho bảng Role
INSERT INTO Role (RoleName) VALUES ('Admin');
INSERT INTO Role (RoleName) VALUES ('Brand Manager');
INSERT INTO Role (RoleName) VALUES ('Branch Manager');


-- Thông tin ảo cho bảng AppUser
INSERT INTO AppUser (UserCode, UserName, Password, RoleID, CreateDate, IsActive, Status, Fullname, Phone, Dob, Gender, UpdateBy, UpdateDate) VALUES 
('9e2a9c0a-3f94-4b6a-8ef2-123456789012', 'admin', 'YeE2JKedsIRzqg6yRuJXIw==', 1, '2024-01-01', 1, 1, 'Admin User', '1234567890', '1970-01-01', 'Male', '1', '2024-01-01'),
('e3c3d1f1-8b8f-4b6a-bc2e-234567890123', 'brand manager', 'YeE2JKedsIRzqg6yRuJXIw==', 2, '2024-01-02', 1, 1, 'Brand Manager One', '1234567891', '1980-01-01', 'Female', '1', '2024-01-02'),
('f3a5c4d7-9d8e-4e4b-bd3f-345678901234', 'brand manager', 'YeE2JKedsIRzqg6yRuJXIw==', 2, '2024-01-03', 1, 1, 'Brand Manager Two', '1234567892', '1981-01-01', 'Male', '1', '2024-01-03'),
('d6e6f7c5-6e7a-4e9b-af4d-456789012345', 'brand manager', 'YeE2JKedsIRzqg6yRuJXIw==', 2, '2024-01-04', 1, 1, 'Brand Manager Three', '1234567893', '1982-01-01', 'Female', '1', '2024-01-04'),
('bed48823-e8ce-4ab6-b214-80ca034fefd0', 'Desmond', 'YeE2JKedsIRzqg6yRuJXIw==', 1, '2024-04-09', 1, 1, 'Desmond Tutu', '1234567894', '1990-04-09', 'Male', '1', '2024-04-09'),
('02eab8bf-add5-4a44-a283-d143fcea2e37', 'Yovonnda', 'YeE2JKedsIRzqg6yRuJXIw==', 2, '2024-02-29', 1, 1, 'Yovonnda Alexis', '1234567895', '1989-02-28', 'Female', '1', '2024-02-29'),
('6ae6ed51-bcff-4aeb-b6af-c6c6d4007ffd', 'Tomlin', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2024-04-24', 1, 1, 'Tomlin Cruz', '1234567896', '1992-04-24', 'Male', '1', '2024-04-24'),
('ce064125-f8fb-4247-86ee-3d63e3111b03', 'Bogart', 'YeE2JKedsIRzqg6yRuJXIw==', 2, '2023-08-31', 1, 1, 'Bogart King', '1234567897', '1988-08-31', 'Male', '1', '2023-08-31'),
('b4286bcf-8b6f-4449-85e8-05e0f4920202', 'Claudius', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2024-03-31', 1, 1, 'Claudius Stone', '1234567898', '1991-03-31', 'Male', '1', '2024-03-31'),
('91115ec9-4190-41ba-97b5-ea0b7da73c05', 'Ethan', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2023-09-01', 1, 1, 'Ethan Hunt', '1234567899', '1990-09-01', 'Male', '1', '2023-09-01'),
('d88a3a67-9bf8-4a5c-9aa9-567ff46d4879', 'Audy', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2024-03-01', 1, 1, 'Audy Brown', '1234567800', '1991-03-01', 'Female', '1', '2024-03-01'),
('c3bb300a-f1fe-4cad-886a-65530e484394', 'Joey', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2023-10-04', 1, 1, 'Joey Tribbiani', '1234567801', '1988-10-04', 'Male', '1', '2023-10-04'),
('1601e8e8-8b63-4058-9789-e673d5de548f', 'Heinrick', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2023-07-22', 1, 1, 'Heinrick Muller', '1234567802', '1987-07-22', 'Male', '1', '2023-07-22'),
('9d9749ed-d2cc-44ac-b661-cea513e15ee5', 'Wilbert', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2023-11-22', 1, 1, 'Wilbert Smith', '1234567803', '1989-11-22', 'Male', '1', '2023-11-22'),
('1df2d80a-c01a-447a-985a-e96590184c22', 'Birgitta', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2024-04-15', 1, 1, 'Birgitta Johnson', '1234567804', '1990-04-15', 'Female', '1', '2024-04-15'),
('eec2f545-7dc0-4e7f-b74c-be69beb900eb', 'Bent', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2023-11-15', 1, 1, 'Bent Pearson', '1234567805', '1989-11-15', 'Male', '1', '2023-11-15'),
('bf6b881b-d930-4feb-aad5-354075dc959c', 'Ira', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2024-04-20', 1, 1, 'Ira Kaplan', '1234567806', '1988-04-20', 'Male', '1', '2024-04-20'),
('491196fc-ff18-43e7-a831-d3066ae508ab', 'Husein', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2024-02-23', 1, 1, 'Husein Al-Amir', '1234567807', '1987-02-23', 'Male', '1', '2024-02-23'),
('e506d7fa-be8d-44cb-88c3-5e292572c32f', 'Jasun', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2024-03-26', 1, 1, 'Jasun Morrow', '1234567808', '1990-03-26', 'Male', '1', '2024-03-26'),
('2c2e613d-3753-449e-9744-16369b2ff0c2', 'Perceval', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2023-10-11', 1, 1, 'Perceval Knight', '1234567809', '1988-10-11', 'Male', '1', '2023-10-11'),
('95a2e6b3-4827-40a5-9d96-89faf5025e38', 'Abramo', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2023-06-21', 1, 1, 'Abramo Villa', '1234567810', '1987-06-21', 'Male', '1', '2023-06-21'),
('bdb28209-13c4-4de2-b77f-b36a54891210', 'Misty', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2024-05-10', 1, 1, 'Misty Green', '1234567811', '1991-05-10', 'Female', '1', '2024-05-10'),
('b0dea5a7-cd92-43f5-9a37-8ef1af0a6982', 'Sylvan', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2023-06-14', 1, 1, 'Sylvan Forest', '1234567812', '1987-06-14', 'Male', '1', '2023-06-14'),
('005436bb-f7d8-43ad-bd71-cf2f3b429392', 'Paule', 'YeE2JKedsIRzqg6yRuJXIw==', 3, '2023-06-20', 1, 1, 'Paule Dupont', '1234567813', '1988-06-20', 'Male', '1', '2023-06-20');



-- Thông tin ảo cho bảng Brand
INSERT INTO Brand (BrandCode, BrandName, UserID, CreateDate, Status, ImageUrl, ImageName) VALUES 
('b1234567-89ab-cdef-0123-456789abcdef', N'Phúc Long', 2, '2024-02-01', 1, NULL, NULL),
('c2345678-9abc-def0-1234-56789abcdef0', N'Cộng', 3, '2024-02-02', 1, NULL, NULL),
('d3456789-abcd-ef01-2345-6789abcdef01', N'Highlands', 4, '2024-02-03', 1, NULL, NULL);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '2fe9bddd-e3c9-4497-a7b2-a0bccb60b085', 'Midel', 11, '12/9/2023', 0);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '97ad401e-98d4-4a4b-b449-7c757af35d7a', 'Topicstorm', 11, '10/2/2023', 2);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '4c06b1ea-0c50-4c35-a7ac-8e42c2d96a0f', 'Jetwire', 6, '3/10/2024', 2);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '4f751b0b-4baa-4cbe-8574-4af6fe23f9c5', 'Yamia', 2, '8/29/2023', 2);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '9b703985-e994-4230-9d5e-db388731396e', 'Npath', 4, '6/13/2023', 1);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'bfa1fdd1-5809-4ab1-aa6b-10ea3809369a', 'Pixoboo', 2, '9/22/2023', 1);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '8623423b-a1a8-4778-b713-3b84d96340bb', 'Youopia', 12, '7/26/2023', 0);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '4cbe3327-7a8a-4530-a27e-da21c1097dc1', 'Avavee', 12, '1/30/2024', 2);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'd629fce0-711d-43b1-85d5-92e53d34ab13', 'Skidoo', 9, '10/5/2023', 2);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'bbe90835-236d-47be-97c1-1f4bbe4c2dcd', 'Wordtune', 11, '6/16/2023', 2);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '1652201e-10c5-4ef9-a520-5986ca4a4100', 'Flipbug', 7, '8/2/2023', 1);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'b2dc03e3-08ae-48d4-aa6b-eab6c1aec684', 'Kazu', 10, '5/13/2024', 0);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '96f7a8e0-b426-48b7-9cfe-09266dad94b7', 'Teklist', 7, '10/15/2023', 2);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'a0030b9c-c86d-4625-9904-f6ee19e51b46', 'Rhyloo', 5, '4/28/2024', 1);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'addd2532-96d8-41d4-95b2-332035616c85', 'Trilia', 7, '2/29/2024', 2);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'edbf2901-5130-4fd4-a811-3bfd36a6d8a7', 'Aibox', 18, '8/23/2023', 0);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'd07bd21f-2ca8-4772-95ef-b88d2f0f6668', 'Quamba', 5, '11/30/2023', 1);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'a2100d43-bac6-4330-ad90-4ba0321ee807', 'Skimia', 9, '1/23/2024', 1);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( 'b0d36a44-45b7-40aa-a0f8-cb945eacfd6b', 'Viva', 20, '9/22/2023', 1);
insert into Brand ( BrandCode, BrandName, UserID, CreateDate, Status) values ( '07e2e547-6763-4e95-8d44-10ffd019ae3d', 'Brainlounge', 14, '2/23/2024', 1);


-- Category
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '93763006-2814-48c2-83e8-95717b4f4860', 'Drywall & Acoustical (FED)', '3/5/2024', '7/28/2023', 2, 10);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '8bcf23e6-7d82-4a66-8034-1fe884401475', 'Retaining Wall and Brick Pavers', '11/26/2023', '7/6/2023', 0, 14);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( 'a725d801-aa4d-497f-9b4d-e843d07af2ef', 'Granite Surfaces', '10/19/2023', '12/3/2023', 0, 12);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ('e23dd68f-d9a9-41db-8b61-3e2a407a4029', 'Marlite Panels (FED)', '12/8/2023', '3/26/2024', 2, 14);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( 'df96f303-4b98-4c00-87f8-aac0c5515251', 'Roofing (Metal)', '11/25/2023', '6/9/2023', 0, 9);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( 'd39030b3-6e13-4ca1-9ae3-83b1b381d1f9', 'Masonry', '4/22/2024', '10/2/2023', 2, 3);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '114b10f0-4901-4463-9470-d38af73e2930', 'Overhead Doors', '8/21/2023', '2/15/2024', 1, 5);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( 'ad8c2c90-d367-49e3-ac09-f5ef59cc65f2', 'Painting & Vinyl Wall Covering', '11/18/2023', '10/31/2023', 0, 1);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( 'e50bf864-02b7-47d2-9785-93b07c16753f', 'Landscaping & Irrigation', '7/12/2023', '3/15/2024', 0, 9);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '99d27e4f-8c1c-424a-9df4-831d656fc6bb', 'Structural & Misc Steel Erection', '4/12/2024', '11/25/2023', 1, 16);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '1971fa1d-df64-4783-b77f-89fcba38b7b8', 'Structural and Misc Steel (Fabrication)', '9/3/2023', '8/15/2023', 2, 6);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '51f47ac2-bc4e-4678-8b4c-dce5c3005da4', 'RF Shielding', '10/13/2023', '6/4/2023', 0, 6);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( 'eadfbec1-d069-48e6-9f4e-6693f252461e', 'Asphalt Paving', '8/23/2023', '6/6/2023', 2, 6);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '0e5b65cf-81e7-4b37-8750-839b83f1ae5e', 'Fire Sprinkler System', '8/2/2023', '5/16/2024', 2, 16);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '0d285210-d7ea-47fd-aa11-7f8a9de0b6a1', 'Drywall & Acoustical (MOB)', '2/21/2024', '8/6/2023', 2, 13);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '109eb85f-91a4-46cf-8358-3b2f23a2b3aa', 'Retaining Wall and Brick Pavers', '2/17/2024', '4/14/2024', 2, 5);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '15ee1124-e23d-4680-baee-60a20d51e6f5', 'Sitework & Site Utilities', '1/6/2024', '10/23/2023', 2, 16);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( 'db42fda6-90ff-46df-b925-258245579489', 'Site Furnishings', '2/13/2024', '8/19/2023', 2, 5);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( 'cb208972-387c-4603-93f5-70640e1e690b', 'Electrical', '2/20/2024', '2/6/2024', 0, 14);
insert into Category ( CategoryCode, CategoryName, UpdateDate, CreateDate, Status, BrandID) values ( '158c8d16-d89b-4eac-b81a-b86b2ddaf79b', 'Elevator', '8/21/2023', '5/26/2024', 2, 6);

-- Store
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'b6421dde-9a83-46bb-9d12-9042bf3b90e4', 0, 11, '4/2/2024', 1, '12th Floor', 'San Sebastian', 20);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( '79444be1-53d2-419a-8a3b-cbdc77dec805', 0, 15, '8/4/2023', 0, 'Room 1241', 'Tyre', 7);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'e6280ceb-5689-409f-9efc-3caefbbba3cd', 0, 18, '9/22/2023', 2, 'Apt 1728', 'Henggouqiao', 8);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( '3353e09e-10a2-4ce7-9b22-539c837cf682', 1, 10, '11/27/2023', 1, '17th Floor', 'Dengyue', 10);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( '0d67e41b-935c-4163-a705-8c70ae43417b', 0, 11, '9/4/2023', 1, 'PO Box 42984', 'Gamawa', 7);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'deb32d2b-04e3-4ab1-b8b1-ec533f9af4b0', 0, 8, '7/6/2023', 0, 'Suite 36', 'Tangfang', 16);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( '670d5660-0cbd-462d-a368-2fd86239f2f4', 1, 3, '6/12/2023', 1, 'Room 71', 'Saint-Rémi', 16);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( '32046c2e-8ac3-4d90-871e-81398c885747', 0, 4, '2/20/2024', 0, 'Room 567', 'Sedandang', 2);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'dc636ec2-1806-4089-8cb1-919977a3f491', 1, 9, '9/21/2023', 1, 'Apt 1748', 'Eldama Ravine', 14);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'a0850f60-14c9-42b7-b4c2-38df43ffc178', 0, 12, '1/13/2024', 1, 'Room 445', 'Şūrān', 2);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'b5cf6255-907a-433d-bdac-cb7e0a9915b7', 1, 14, '2/22/2024', 2, 'Apt 1301', 'San Bernardo', 5);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'c5efbf51-d3bf-4049-89ff-cfb68d82152c', 1, 12, '7/9/2023', 2, 'Apt 511', 'Sapareva Banya', 6);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( '9447c085-d790-4837-a791-dd2fa67f3648', 1, 16, '11/1/2023', 0, 'Apt 685', 'Bayawan', 19);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( '18b1743a-0c43-41a9-9443-b9e758aa0fad', 0, 1, '1/29/2024', 2, '15th Floor', 'Valencia', 9);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( '2e78c582-0e80-4b6d-bdf2-e9436df0e923', 0, 12, '4/26/2024', 1, 'Suite 38', 'Pengilon', 12);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'a7bef7c7-a5fe-48d7-8eca-a60d44449328', 0, 19, '7/13/2023', 2, 'Apt 1370', 'Draginje', 16);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( '7759e5a5-b337-4516-827b-9791a2db4ee9', 0, 7, '2/4/2024', 1, 'PO Box 57523', 'Phú Thái', 3);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'c9abf845-9147-4493-ab54-ab0cae463fd9', 1, 1, '12/7/2023', 0, 'PO Box 37989', 'Nizhnedevitsk', 7);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'b5e480b0-25c2-4fea-b191-96416eb4a046', 1, 7, '2/4/2024', 1, '17th Floor', 'Zapatero', 13);
insert into Store ( StoreCode, IsActive, UserID, CreateDate, Status, Address, City, BrandID) values ( 'e5ac02d8-b540-4641-aedb-269d6d4fd10a', 0, 18, '7/30/2023', 2, '1st Floor', 'Jiangnan', 6);


--Product 
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('c6fffd30-e27f-4a47-9bf2-e77883dec225', 'Magnificent frigate bird', 'Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum.', '8/12/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('71559602-7991-483b-9548-089eaf251578', 'Water monitor', 'Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', '7/20/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('2fdcd0aa-e1b2-4d80-8346-1c2192536397', 'Silver gull', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', '6/18/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('179dbce0-fa80-42f9-82ca-0bebf1e4be83', 'American buffalo', 'Proin risus. Praesent lectus.', '1/9/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('0d09d558-1884-40aa-a853-49a170c167dc', 'Levaillant''s barbet', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.', '10/24/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('518ae116-2af6-439b-9115-6cc8a223f5a8', 'Cormorant, king', 'Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.', '6/1/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('304cdd70-98d0-456d-ae41-bfd40ea8ac3e', 'Mudskipper (unidentified)', 'Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus.', '3/4/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('1a58feb5-9a19-4b30-a220-cde189547cdf', 'Goose, andean', 'Sed vel enim sit amet nunc viverra dapibus.', '1/23/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('9b12f396-3a5c-4383-a797-63191886f98e', 'Toucan, white-throated', 'Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '5/31/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('78881ae9-0db4-4601-a984-561858cfe439', 'Common green iguana', 'Donec vitae nisi.', '6/23/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('7036b51f-e4a5-43ca-8e05-55753cb881a9', 'Skunk, western spotted', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.', '10/20/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('47a02ccc-9264-4b88-9f55-f6ed3c4d55e4', 'Marshbird, brown and yellow', 'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', '5/16/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('92c0fb79-0141-41ea-a4f6-0c479971195c', 'Canadian river otter', 'Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', '11/5/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('5d13fcf4-b31c-4334-9afd-b66324d3f395', 'Hartebeest, coke''s', 'Vestibulum rutrum rutrum neque.', '6/22/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('b7dc209c-1e3f-4341-9a5e-5508606ef6f2', 'Ring-tailed coatimundi', 'Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc.', '1/4/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('09d58fd3-77ce-4ae3-915c-7737dbc6a8c1', 'Klipspringer', 'Maecenas tincidunt lacus at velit.', '8/31/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('529fe75d-fd5e-4501-aa52-0f60a7cdaf4c', 'Lizard, desert spiny', 'In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', '8/23/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('3aa0a5d1-de13-4b46-ad42-389519f8d30e', 'Macaw, blue and yellow', 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '3/2/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('21c0171a-39b7-4bdd-b1f2-88c8fab60377', 'Spotted-tailed quoll', 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', '12/19/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('297b8d10-8344-45d8-a85d-ce6e1466d213', 'Red squirrel', 'Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus. Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.', '12/14/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('8030cae4-c69e-429b-90a3-64dab2986eb5', 'Mynah, common', 'Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.', '3/14/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('0bc2e654-3cd0-40ef-a9fa-3b3915741287', 'Mexican wolf', 'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.', '3/29/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('33ba7949-2f3c-4aea-9e99-d818f0be9ce0', 'Peacock, indian', 'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.', '2/13/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('34e82a87-c98d-4f28-9cb5-efefc1c06589', 'Savannah deer', 'Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus.', '11/6/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('14713ae8-6c1b-4e7d-b0f3-92a0be9f6cd2', 'Ring-tailed possum', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio.', '8/15/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('8d5fa6b3-2741-41cf-ba22-d2fd1ebee149', 'Black-tailed prairie dog', 'Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', '6/12/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('02dea72f-c403-4000-9e3b-d690ce3be7b4', 'Coke''s hartebeest', 'Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla.', '6/25/2023', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('baeea2f4-a07d-4db4-99f1-e5a1d6f309c8', 'Oryx, beisa', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.', '5/12/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('b4a7acdc-8310-4f5d-82f6-4f065c4e953f', 'Bear, sloth', 'Phasellus in felis.', '5/16/2024', 1, 8);
insert into Product (ProductCode, ProductName, Description, CreateDate, BrandID, CategoryID) values ('33e36ee5-25fd-4b51-9f7e-9c6c9c7693b2', 'Blackbird, red-winged', 'Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', '2/14/2024', 1, 8);

--category
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '85b7f688-a323-460d-aa05-096fb64fe27a', 'Doors, Frames & Hardware', '8/17/2023', '3/25/2024', 13,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '3de8a465-8194-4508-a62d-a636891b1101', 'Plumbing & Medical Gas', '5/26/2024', '12/23/2023', 16,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( 'f8030941-20e9-4220-b999-7e084d107c6c', 'Rebar & Wire Mesh Install', '9/14/2023', '6/27/2023', 3,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '305c6046-5f32-4360-bd0c-f8956903b467', 'Site Furnishings', '12/12/2023', '6/18/2023', 14 ,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( 'bcf9cfc6-9202-4952-be0d-aa67fe902c5f', 'Landscaping & Irrigation', '7/2/2023', '11/28/2023', 10 ,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '0cd20b4c-97cb-48d1-9200-25c3962fe26b', 'Prefabricated Aluminum Metal Canopies', '2/5/2024', '9/16/2023', 12,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '96a68a36-df65-4c96-9ba5-e9fd90356f2a', 'EIFS', '10/3/2023', '2/16/2024', 9,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( 'a0500cd0-883b-4136-82b4-7c1dfb34aaa7', 'Masonry', '1/8/2024', '10/28/2023', 8,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values  ('64a3d307-0a79-45a4-a269-b943688a00ed', 'Retaining Wall and Brick Pavers', '12/19/2023', '12/4/2023', 19,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '558a92c7-283b-4e81-9601-4f757b97557b', 'Electrical', '10/5/2023', '12/15/2023', 2,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ('423d4770-992a-4ff8-b1b6-d1959d14e8b7', 'Elevator', '3/12/2024', '7/2/2023', 16,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '50be5e8f-3397-420e-a820-ee01be978675', 'Temp Fencing, Decorative Fencing and Gates', '1/28/2024', '1/28/2024', 2,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '6511fe8e-e0a0-400e-8ca0-f384022b8b4a', 'Framing (Steel)', '1/30/2024', '9/20/2023', 11,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '2ea2d79d-36a2-4f45-8442-45e34194195d', 'Drywall & Acoustical (FED)', '6/29/2023', '12/20/2023', 17,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '554c3e35-504b-4b57-a862-1d79735dbb62', 'Fire Protection', '6/13/2023', '1/23/2024', 18,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( 'cc5b0c90-3350-4b5f-8585-87d59960b0e2', 'Asphalt Paving', '9/30/2023', '5/28/2023', 4,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ('3cfedcd9-0cfa-4ddb-a747-b80d22a447e7', 'Temp Fencing, Decorative Fencing and Gates', '12/15/2023', '9/14/2023', 13,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '64f814e4-d991-4f14-9717-d5fc126c7526', 'Prefabricated Aluminum Metal Canopies', '4/15/2024', '3/26/2024', 3,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '87ed079d-7ebd-4346-8dcd-3712bc20957a', 'Termite Control', '9/10/2023', '5/21/2024', 16,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '6250ff88-bc26-4a2e-9487-da373b51a9e6', 'Waterproofing & Caulking', '11/18/2023', '1/26/2024', 16,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '64dec7ae-d908-44f1-973e-cc2cdce67631', 'Framing (Steel)', '12/22/2023', '4/25/2024', 1,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( 'f5b4d833-ab51-44f5-9f53-6a5e3a4f4f2e', 'Framing (Steel)', '2/22/2024', '8/20/2023', 5,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '1da35371-0ef9-4dfd-b27a-69731c67a335', 'Wall Protection', '1/17/2024', '1/11/2024', 9,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( 'ab5fcee7-70fc-4adb-ac16-67db7c2a9986', 'RF Shielding', '6/23/2023', '2/15/2024', 7,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '3a5e8c4e-aa87-4cac-b7a4-37b471ba28c3', 'Soft Flooring and Base', '9/8/2023', '10/4/2023', 6,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( 'a50f10d0-bb09-48a7-bb17-e7d3b597efc0', 'Waterproofing & Caulking', '2/19/2024', '11/9/2023', 14,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( 'dc6b61c5-e324-4527-b4fa-20c60b1eb4fa', 'Structural & Misc Steel Erection', '3/10/2024', '1/10/2024', 11,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ( '9a614ca7-a240-4652-892a-01458de55bd5', 'Sitework & Site Utilities', '5/13/2024', '1/10/2024', 17,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ('18fdc47e-8077-4e62-9f9b-c7b4ed55f42b', 'Plumbing & Medical Gas', '11/24/2023', '9/3/2023', 17,1);
insert into CustomerSegment ( SegmentCode, SegmentName, CreateDate, UpdateDate, BrandID, Status) values ('891c4fd5-3f75-4451-b1c0-dcc85999fd35', 'RF Shielding', '7/13/2023', '8/13/2023', 11,1);

--group attribute
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Hard Tile & Stone', '8/20/2023');
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Doors, Frames & Hardware', '7/29/2023');
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Granite Surfaces', '12/30/2023');
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Structural & Misc Steel Erection', '9/10/2023');
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Construction Clean and Final Clean', '6/6/2023');
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Drywall & Acoustical (FED)', '9/18/2023');
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Electrical and Fire Alarm', '5/19/2024');
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Roofing (Asphalt)', '3/22/2024');
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Roofing (Metal)', '7/2/2023');
insert into GroupAttribute ( GroupAttributeName, CreateDate) values ( 'Roofing (Metal)', '3/18/2024');

--attribute
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( '1cd81372-e7e9-400a-add8-2cee869324cc', 'weight', 'Etiam faucibus cursus urna. Ut tellus.', 2, '7/25/2023', '4/3/2024', 7);
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( 'b5b80199-6594-40d2-a013-02d9ff67df0e', 'weight', 'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', 1, '8/26/2023', '6/30/2023', 10);
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( '965488d0-c17c-4f75-9d40-c4c9b13bad3e', 'weight', 'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.', 2, '7/12/2023', '10/23/2023', 9);
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( 'd615cf99-2274-49b3-b9ee-a40dd874d3e8', 'size', 'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.', 1, '1/5/2024', '12/28/2023', 6);
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( 'fcc20bc2-db9d-4e41-9250-993d88b483fa', 'size', 'Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.', 2, '8/30/2023', '10/15/2023', 6);
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( '1d1c8227-6644-4d27-81ee-da53850af59a', 'color', 'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.', 2, '8/4/2023', '5/11/2024', 1);
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( '9f132d87-b14b-4daa-9f8b-5d8cd3397e78', 'weight', 'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio.', 0, '7/9/2023', '12/22/2023', 8);
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( '10c3d27b-3e96-4fef-94b4-492b7cff5d82', 'brand', 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.', 0, '11/30/2023', '2/1/2024', 2);
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( '39f6e94f-93c2-432c-a513-392b82c6f474', 'size', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.', 0, '10/16/2023', '6/28/2023', 5);
insert into Attribute ( AttributeCode, AttributeName, Description, Status, CreateDate, UpdateDate, GroupAttributeID) values ( '07bdc6d7-de66-42f0-a4d0-6f2e0b8e4159', 'color', 'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 2, '3/9/2024', '9/13/2023', 6);


--SegmentAttribute
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (10, 1, 'NA');
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (6, 3, 'NA');
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (9, 8, 'NA');
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (2, 2, 'AF');
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (5, 7, 'AS');
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (7, 3, 'AS');
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (4, 1, 'AF');
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (6, 10, 'EU');
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (7, 10, 'AS');
insert into SegmentAttribute (SegmentID, AttributeID, Value) values (9, 8, 'AS');


--Menu
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( 'bfdd194b-0cd5-4462-914c-fb43dd86d5ec', '1/2/2024', 0, 2);
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( 'ce30468f-8d3f-4283-a69b-f4b23f71bc73', '3/25/2024', 1, 10);
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( '19e388d2-cdae-4991-a486-62c1f807d95d', '8/14/2023', 1, 7);
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( '3f04f7e0-ff88-4f46-8a00-2870e2fb9baf', '4/13/2024', 1, 1);
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( '1d8c44a2-04c0-4215-b368-df7aae1d15de', '8/23/2023', 1, 3);
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( 'b985ad24-24a6-4e4f-b913-de8931f2ea22', '7/10/2023', 1, 2);
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( '992eb6cc-6e43-42d9-9ea9-0f613094f3ec', '10/8/2023', 1, 3);
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( '81bbd1c7-bb39-41c4-a2b5-2b0db6767e6d', '12/26/2023', 0, 7);
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( '3ef4ac78-eed0-4f79-83dd-3b212cd5c1be', '8/18/2023', 0, 6);
insert into Menu ( MenuCode, CreateDate, IsActive, BrandID) values ( '56b32ea0-623b-4952-8256-89db4ff94010', '1/29/2024', 1, 6);


--ProductMenu
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (17, 1, 5, 3);
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (20, 8, 5, 9);
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (23, 1, 6, 8);
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (28, 9, 8, 14);
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (19, 8, 6, 7);
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (19, 2, 1, 11);
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (28, 5, 3, 1);
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (23, 4, 4, 11);
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (30, 8, 3, 9);
insert into ProductMenu (Price, ProductID, MenuID, DisplayIndex) values (17, 3, 7, 5);

--MenuSegment
insert into MenuSegment (Priority, MenuID, SegmentID) values (9, 7, 9);
insert into MenuSegment (Priority, MenuID, SegmentID) values (15, 8, 10);
insert into MenuSegment (Priority, MenuID, SegmentID) values (9, 9, 4);
insert into MenuSegment (Priority, MenuID, SegmentID) values (11, 1, 10);
insert into MenuSegment (Priority, MenuID, SegmentID) values (5, 6, 4);
insert into MenuSegment (Priority, MenuID, SegmentID) values (13, 4, 4);
insert into MenuSegment (Priority, MenuID, SegmentID) values (20, 1, 9);
insert into MenuSegment (Priority, MenuID, SegmentID) values (16, 5, 6);
insert into MenuSegment (Priority, MenuID, SegmentID) values (15, 8, 4);
insert into MenuSegment (Priority, MenuID, SegmentID) values (18, 9, 6);

--Screen
insert into Screen (StoreID) values (2);
insert into Screen ( StoreID) values ( 3);
insert into Screen ( StoreID) values ( 9);
insert into Screen ( StoreID) values ( 4);
insert into Screen ( StoreID) values ( 9);
insert into Screen ( StoreID) values (6);
insert into Screen ( StoreID) values (6);
insert into Screen ( StoreID) values ( 5);
insert into Screen ( StoreID) values ( 1);
insert into Screen ( StoreID) values ( 9);
update AppUser 
set IsActive = 1
where UserCode = '9e2a9c0a-3f94-4b6a-8ef2-123456789012'
