-- NexLogix Demo Data Seed Script (All Hubs Included)
-- Run this in MySQL Workbench or via:
-- mysql -u root -p'Sanjay@123' nexlogix < backend/NexLogix.API/Data/seed.sql

USE nexlogix;

-- 1. Insert Default Users (Password: NexLogix@2026 for Operator, Admin@2026 for Admin)
INSERT INTO Users (FullName, Email, Phone, PasswordHash, Role, CreatedAt)
VALUES 
('Alex Mercer', 'operator@nexlogix.io', '+1 (503) 555-0100', '$2a$12$e6mZz5vO9F8hQ4u4Kq6aUOSgHn8d7L4G6r8q0zN8p6o4u4Kq6aUOS', 'Operator', NOW()),
('System Admin', 'admin@nexlogix.io', '+1 (503) 555-0101', '$2a$12$8Y3Z1Uo9b6A3w1h6F4k2G.e2a1k9c8h7l6j5h4g3f2d1s0a9b8c7d', 'Admin', NOW())
ON DUPLICATE KEY UPDATE FullName = VALUES(FullName);

-- 2. Insert Customers
INSERT INTO Customers (Name, Email, Phone, Address, CreatedAt)
VALUES
('Sarah Jenkins', 'sarah.j@example.com', '+1 (503) 555-0142', '1842 Oak Street, Portland, OR 97205', NOW()),
('David Chen', 'dchen@example.com', '+1 (503) 555-0189', '620 NW Everett St, Portland, OR 97209', NOW()),
('Elena Rostova', 'elena.r@example.com', '+1 (503) 555-0219', '915 SE Belmont St, Portland, OR 97214', NOW()),
('Marcus Vance', 'm.vance@example.com', '+1 (503) 555-0322', '247 NE Broadway, Portland, OR 97232', NOW()),
('Chloe Simmons', 'csimmons@example.com', '+1 (503) 555-0455', '1030 SW Jefferson St, Portland, OR 97201', NOW()),
('Brandon Lee', 'blee@example.com', '+1 (415) 555-0199', '742 Market St, San Francisco, CA 94102', NOW()),
('Sophia Patel', 'spatel@example.com', '+1 (212) 555-0188', '350 5th Ave, New York, NY 10118', NOW()),
('Carlos Mendez', 'cmendez@example.com', '+1 (206) 555-0177', '1200 4th Ave, Seattle, WA 98101', NOW())
ON DUPLICATE KEY UPDATE Name = VALUES(Name);

-- Variables
SET @c1 = (SELECT Id FROM Customers WHERE Name = 'Sarah Jenkins' LIMIT 1);
SET @c2 = (SELECT Id FROM Customers WHERE Name = 'David Chen' LIMIT 1);
SET @c3 = (SELECT Id FROM Customers WHERE Name = 'Elena Rostova' LIMIT 1);
SET @c4 = (SELECT Id FROM Customers WHERE Name = 'Marcus Vance' LIMIT 1);
SET @c5 = (SELECT Id FROM Customers WHERE Name = 'Chloe Simmons' LIMIT 1);
SET @c6 = (SELECT Id FROM Customers WHERE Name = 'Brandon Lee' LIMIT 1);
SET @c7 = (SELECT Id FROM Customers WHERE Name = 'Sophia Patel' LIMIT 1);
SET @c8 = (SELECT Id FROM Customers WHERE Name = 'Carlos Mendez' LIMIT 1);
SET @u1 = (SELECT Id FROM Users WHERE Email = 'operator@nexlogix.io' LIMIT 1);

-- 3. Insert Shipments with Hub-Specific Origin Addresses
INSERT INTO Shipments (TrackingNumber, Status, ScheduledDelivery, OriginAddress, DestinationAddress, WeightKg, RiskScore, RiskLevel, CustomerId, AssignedUserId, CreatedAt)
VALUES
-- North Regional Hub - Terminal 4
('NLX-084291', 'At hub · delayed', DATE_ADD(NOW(), INTERVAL 28 MINUTE), 'North Regional Hub - Terminal 4 · Bay 7', '1842 Oak Street, Portland, OR 97205', 4.2, 94.0, 'Critical', @c1, @u1, DATE_SUB(NOW(), INTERVAL 3 HOUR)),
('NLX-084176', 'Out for delivery', DATE_ADD(NOW(), INTERVAL 46 MINUTE), 'North Regional Hub - Terminal 4 · R-018', '620 NW Everett St, Portland, OR 97209', 2.1, 91.0, 'Critical', @c2, @u1, DATE_SUB(NOW(), INTERVAL 4 HOUR)),
('NLX-083958', 'At hub · delayed', DATE_ADD(NOW(), INTERVAL 72 MINUTE), 'North Regional Hub - Terminal 4 · R-031', '915 SE Belmont St, Portland, OR 97214', 8.7, 89.0, 'Critical', @c3, @u1, DATE_SUB(NOW(), INTERVAL 5 HOUR)),
('NLX-084305', 'Out for delivery', DATE_ADD(NOW(), INTERVAL 135 MINUTE), 'North Regional Hub - Terminal 4 · R-009', '247 NE Broadway, Portland, OR 97232', 1.5, 86.0, 'Critical', @c4, @u1, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
('NLX-084012', 'Out for delivery', DATE_ADD(NOW(), INTERVAL 165 MINUTE), 'North Regional Hub - Terminal 4 · R-026', '1030 SW Jefferson St, Portland, OR 97201', 3.8, 83.0, 'Critical', @c5, @u1, DATE_SUB(NOW(), INTERVAL 6 HOUR)),

-- South Gateway Terminal 2
('NLX-091402', 'Line-haul delay', DATE_ADD(NOW(), INTERVAL 35 MINUTE), 'South Gateway Terminal 2 · Bay 4', '742 Market St, San Francisco, CA 94102', 6.5, 88.0, 'Critical', @c6, @u1, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
('NLX-091518', 'Sorting backlog', DATE_ADD(NOW(), INTERVAL 100 MINUTE), 'South Gateway Terminal 2 · R-204', '1055 Mission St, San Francisco, CA 94103', 3.4, 79.0, 'Critical', @c6, @u1, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
('NLX-091629', 'Out for delivery', DATE_ADD(NOW(), INTERVAL 190 MINUTE), 'South Gateway Terminal 2 · R-212', '480 Castro St, San Francisco, CA 94114', 1.8, 48.0, 'Moderate', @c6, @u1, DATE_SUB(NOW(), INTERVAL 3 HOUR)),

-- East Coast Sortation Facility - Hub A
('NLX-073104', 'Severe weather hold', DATE_ADD(NOW(), INTERVAL 55 MINUTE), 'East Coast Sortation Facility - Hub A · Inbound 1', '350 5th Ave, New York, NY 10118', 12.0, 96.0, 'Critical', @c7, @u1, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
('NLX-073289', 'At hub · delayed', DATE_ADD(NOW(), INTERVAL 120 MINUTE), 'East Coast Sortation Facility - Hub A · Bay 12', '158 W 23rd St, New York, NY 10011', 5.1, 82.0, 'Critical', @c7, @u1, DATE_SUB(NOW(), INTERVAL 3 HOUR)),
('NLX-073412', 'Dispatched', DATE_ADD(NOW(), INTERVAL 240 MINUTE), 'East Coast Sortation Facility - Hub A · R-501', '88 Pine St, New York, NY 10005', 2.2, 35.0, 'Stable', @c7, @u1, DATE_SUB(NOW(), INTERVAL 4 HOUR)),

-- West Pacific Automated Logistics Depot
('NLX-062890', 'Conveyor jam delay', DATE_ADD(NOW(), INTERVAL 15 MINUTE), 'West Pacific Automated Logistics Depot · Belt C', '1200 4th Ave, Seattle, WA 98101', 7.9, 92.0, 'Critical', @c8, @u1, DATE_SUB(NOW(), INTERVAL 1 HOUR)),
('NLX-062944', 'Out for delivery', DATE_ADD(NOW(), INTERVAL 80 MINUTE), 'West Pacific Automated Logistics Depot · R-710', '2101 7th Ave, Seattle, WA 98121', 4.6, 74.0, 'Moderate', @c8, @u1, DATE_SUB(NOW(), INTERVAL 2 HOUR)),
('NLX-063011', 'In transit', DATE_ADD(NOW(), INTERVAL 225 MINUTE), 'West Pacific Automated Logistics Depot · R-718', '400 Broad St, Seattle, WA 98109', 3.1, 28.0, 'Stable', @c8, @u1, DATE_SUB(NOW(), INTERVAL 5 HOUR))
ON DUPLICATE KEY UPDATE 
OriginAddress = VALUES(OriginAddress),
Status = VALUES(Status),
RiskScore = VALUES(RiskScore),
RiskLevel = VALUES(RiskLevel);

-- 4. Insert Delivery Exceptions
SET @s1 = (SELECT Id FROM Shipments WHERE TrackingNumber = 'NLX-084291' LIMIT 1);
SET @s2 = (SELECT Id FROM Shipments WHERE TrackingNumber = 'NLX-084176' LIMIT 1);
SET @s3 = (SELECT Id FROM Shipments WHERE TrackingNumber = 'NLX-083958' LIMIT 1);
SET @s4 = (SELECT Id FROM Shipments WHERE TrackingNumber = 'NLX-091402' LIMIT 1);
SET @s5 = (SELECT Id FROM Shipments WHERE TrackingNumber = 'NLX-073104' LIMIT 1);
SET @s6 = (SELECT Id FROM Shipments WHERE TrackingNumber = 'NLX-062890' LIMIT 1);

INSERT INTO DeliveryExceptions (ShipmentId, ExceptionType, Description, Status, ReportedAt)
VALUES
(@s1, 'Hub Delay', 'Inbound feeder truck arrived 45m behind schedule due to I-5 corridor delays. Package missed original sorting wave at Sortation Bay 7.', 'Open', DATE_SUB(NOW(), INTERVAL 32 MINUTE)),
(@s2, 'Gate Lock', 'Apartment call-box PIN missing. Consignee profile lacks security gate keypad entry PIN. Driver made 1 contact attempt without response.', 'Open', DATE_SUB(NOW(), INTERVAL 18 MINUTE)),
(@s3, 'Customer Away', 'Direct signature required by shipper. Geo-telematics historical profile indicates recipient typically returns home after 17:30.', 'Open', DATE_SUB(NOW(), INTERVAL 45 MINUTE)),
(@s4, 'Line-haul Stoppage', 'Interstate highway blockade halted feeder transit into South Gateway terminal.', 'Open', DATE_SUB(NOW(), INTERVAL 20 MINUTE)),
(@s5, 'Severe Weather Freeze', 'Blizzard condition in Tri-State corridor forced ground fleet staging hold.', 'Open', DATE_SUB(NOW(), INTERVAL 50 MINUTE)),
(@s6, 'Belt C Jam', 'Optical scanner read error caused parcel overflow backlog at sorting chute 3.', 'Open', DATE_SUB(NOW(), INTERVAL 12 MINUTE))
ON DUPLICATE KEY UPDATE Description = VALUES(Description);
