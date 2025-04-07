CREATE TABLE [USER] (
    User_ID INT PRIMARY KEY IDENTITY(1,1),
    Name VARCHAR(100) NOT NULL,
    Phone_Number VARCHAR(15) UNIQUE NOT NULL, 
    Email VARCHAR(100) UNIQUE NOT NULL,
    License_Number(50) UNIQUE NOT NULL
    
);

CREATE TABLE RentalBooking (
    BookingID INT PRIMARY KEY,
    User_ID INT,
    VehicleID INT,
    StartDate DATE,
    EndDate DATE,
    TotalAmount DECIMAL(10, 2),
    Status VARCHAR(20),
    FOREIGN KEY (User_ID) REFERENCES [User]([User_ID]),
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID)
);

CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY,
    BookingID INT,
    AmountPaid DECIMAL(10, 2),
    PaymentDate DATE,
    PaymentMethod VARCHAR(50),
    FOREIGN KEY (BookingID) REFERENCES RentalBooking(BookingID)
);

CREATE TABLE Cancellation (
    CancelID INT PRIMARY KEY,
    BookingID INT,
    CancelDate DATE,
    Reason VARCHAR(200),
    FOREIGN KEY (BookingID) REFERENCES RentalBooking(BookingID)
);

CREATE TABLE Refund (
    RefundID INT PRIMARY KEY,
    CancelID INT,
    RefundAmount DECIMAL(10, 2),
    RefundDate DATE,
    RefundStatus VARCHAR(20),
    FOREIGN KEY (CancelID) REFERENCES Cancellation(CancelID)
);

CREATE TABLE Maintenance (
    MaintenanceID INT PRIMARY KEY,
    VehicleID INT,
    Description VARCHAR(200),
    MaintenanceDate DATE,
    Cost DECIMAL(10, 2),
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID)
);

CREATE TABLE Insurance (
    InsuranceID INT PRIMARY KEY,
    VehicleID INT,
    InsuranceProvider VARCHAR(100),
    PolicyNumber VARCHAR(50),
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (VehicleID) REFERENCES Vehicle(VehicleID)
);

CREATE TABLE Offers (
    OfferID INT PRIMARY KEY,
    VehicleID INT,
    DiscountPercentage DECIMAL(5, 2),
    StartDate DATE,
    EndDate DATE,
);
