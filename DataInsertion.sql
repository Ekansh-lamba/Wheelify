---------------------------
-- Insert 5 new rows into USER
---------------------------
INSERT INTO [USER] (User_ID, Name, Email, Phone_Number, Address, License_Number)
VALUES 
(6, 'Alice Johnson', 'alice.johnson@example.com', '9876500001', '12 Green St, CityA', 'DL67890'),
(7, 'Bob Martin', 'bob.martin@example.com', '9876500002', '34 Blue Ave, CityB', 'DL78901'),
(8, 'Carol King', 'carol.king@example.com', '9876500003', '56 Red Rd, CityC', 'DL89012'),
(9, 'David Lee', 'david.lee@example.com', '9876500004', '78 Yellow Ln, CityD', 'DL90123'),
(10, 'Eva Stone', 'eva.stone@example.com', '9876500005', '90 Purple Blvd, CityE', 'DL01234');

---------------------------
-- Insert 5 new rows into Vehicle
---------------------------
INSERT INTO Vehicle (VehicleID, Model, Type, NumberPlate, Availability, RentPerDay)
VALUES
(6, 'Maruti Swift', 'Car', 'MH06XY6789', 1, 1300.00),
(7, 'Bajaj Pulsar', 'Bike', 'MH07YZ7890', 1, 850.00),
(8, 'TVS Apache', 'Bike', 'MH08ZA8901', 1, 950.00),
(9, 'Hero Splendor', 'Bike', 'MH09AB9012', 1, 750.00),
(10, 'Honda Activa', 'Scooty', 'MH10BC0123', 1, 400.00);

---------------------------
-- Insert 5 new rows into RentalBooking
---------------------------
INSERT INTO RentalBooking (BookingID, User_ID, VehicleID, StartDate, EndDate, TotalAmount, Status)
VALUES
(6, 6, 6, '2025-05-01', '2025-05-05', 5200.00, 'Confirmed'),
(7, 7, 7, '2025-05-02', '2025-05-03', 1700.00, 'Completed'),
(8, 8, 8, '2025-05-03', '2025-05-06', 2850.00, 'Pending'),
(9, 9, 9, '2025-05-04', '2025-05-07', 2250.00, 'Cancelled'),
(10, 10, 10, '2025-05-05', '2025-05-08', 1200.00, 'Confirmed');

---------------------------
-- Insert 5 new rows into Payment
---------------------------
INSERT INTO Payment (PaymentID, BookingID, AmountPaid, PaymentDate, PaymentMethod)
VALUES
(6, 6, 5200.00, '2025-05-01', 'Credit Card'),
(7, 7, 1700.00, '2025-05-02', 'UPI'),
(8, 8, 2850.00, '2025-05-03', 'Cash'),
(9, 9, 2250.00, '2025-05-04', 'Debit Card'),
(10, 10, 1200.00, '2025-05-05', 'Credit Card');

---------------------------
-- Insert 5 new rows into Cancellation
---------------------------
-- (Note: Even if not all bookings are cancelled, we add 5 cancellation rows for testing.)
INSERT INTO Cancellation (CancelID, BookingID, CancelDate, Reason)
VALUES
(6, 7, '2025-05-03', 'User changed plans'),
(7, 8, '2025-05-04', 'Vehicle not available'),
(8, 9, '2025-05-05', 'Late cancellation'),
(9, 10, '2025-05-06', 'Price mismatch'),
(10, 6, '2025-05-02', 'Accidental booking');

---------------------------
-- Insert 5 new rows into Refund
---------------------------
--
