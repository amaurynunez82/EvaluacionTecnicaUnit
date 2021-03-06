USE master
--drop database EvaluacionTecnicaUnit2
GO
CREATE DATABASE EvaluacionTecnicaUnit2
GO
USE EvaluacionTecnicaUnit2
GO

CREATE TABLE dbo.Customers(
	Id int NOT NULL CONSTRAINT PK_CUSTOMERS PRIMARY KEY,
	Name nvarchar(80) NULL,
	LastName nvarchar(80) NULL,
	DateOfBirth datetime2(7) NOT NULL,
	EmailAddress nvarchar(255) NULL,
	Gender nvarchar(1) NULL,
	ContactPhoneNumber nvarchar(12) NULL)

CREATE TABLE dbo.Phones(
	Id int NOT NULL CONSTRAINT PK_PHONES PRIMARY KEY,
	CustomerId int  NOT NULL CONSTRAINT FK_PHONES_CUESTOMER FOREIGN KEY (CustomerId) references Customers(Id),
	Phone nvarchar(12) NULL)