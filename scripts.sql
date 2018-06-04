create table bbu.Funeral 
(
	Id uniqueidentifier not null primary key,
	FuneralNumber varchar(6),
	GraveNumber varchar(50),
	DeceasedId uniqueidentifier not null,
	InformantId uniqueidentifier,
	NextOfKinId uniqueidentifier,
	DoctorId uniqueidentifier,
	HomeAffairsOfficerId uniqueidentifier,
	MortuaryId uniqueidentifier,
	CemeteryId uniqueidentifier
);

create table bbu.[Address]
(
	Id uniqueidentifier not null primary key,
	FullAddress varchar(1000),
	StreetNumber varchar(10),
	StreetAddress varchar(300),
	SubLocality varchar(150),
	Suburb varchar(150),
	City varchar(150),
	Province varchar(150),
	Country varchar(150),
	PostalCode varchar(5)
);

create table bbu.Cemetery
(
	Id uniqueidentifier not null primary key,
	Name varchar(150),
	AddressId uniqueidentifier
);

create table bbu.Hospital
(
	Id uniqueidentifier not null primary key,
	Name varchar(150),
	AddressId uniqueidentifier
);

create table bbu.Mortuary
(
	Id uniqueidentifier not null primary key,
	Name varchar(150),
	AddressId uniqueidentifier
);

create table bbu.Person
(
	Id uniqueidentifier not null primary key,
	FirstName varchar(150) not null,
	LastName varchar(150) not null,
	SAIdNumber varchar(13),
	DateOfBirth datetime null,
	GenderId int not null,
	ContactNumber varchar(13),
	EmailAddress varchar(100),
	AddressId uniqueidentifier
);

create table bbu.Deceased
(
	PersonId uniqueidentifier unique not null,
	FuneralId uniqueidentifier,
	DateOfDeath datetime,
	PlaceOfDeath varchar(1000),
	WhereWasTheBodyRetrieved varchar(1000),
	CauseOfDeath varchar(max),
);

create table bbu.Gender
(
	Id int not null primary key,
	Name varchar(20)
);

create table bbu.Informant
(
	PersonId uniqueidentifier unique not null,
);

create table bbu.NextOfKin
(
	PersonId uniqueidentifier unique not null,
);

create table bbu.Doctor
(
	PersonId uniqueidentifier unique not null,
	HospitalId uniqueidentifier
);

create table bbu.HomeAffairsOfficer
(
	PersonId uniqueidentifier unique not null
);

alter table bbu.Funeral add foreign key (DeceasedId) references bbu.Deceased(PersonId);
alter table bbu.Funeral add foreign key (InformantId) references bbu.Informant(PersonId);
alter table bbu.Funeral add foreign key (NextOfKinId) references bbu.NextOfKin(PersonId);
alter table bbu.Funeral add foreign key (DoctorId) references bbu.Doctor(PersonId);
alter table bbu.Funeral add foreign key (HomeAffairsOfficerId) references bbu.HomeAffairsOfficer(PersonId);
alter table bbu.Funeral add foreign key (MortuaryId) references bbu.Mortuary(Id);
alter table bbu.Funeral add foreign key (CemeteryId) references bbu.Cemetery(Id);
alter table bbu.funeral add unique (funeralnumber);

alter table bbu.Cemetery add foreign key (AddressId) references bbu.[Address](Id);

alter table bbu.Hospital add foreign key (AddressId) references bbu.[Address](Id);

alter table bbu.Mortuary add foreign key (AddressId) references bbu.[Address](Id);

alter table bbu.Deceased add foreign key (FuneralId) references bbu.Funeral(Id);
alter table bbu.Deceased add foreign key (PersonId) references bbu.Person(Id);

alter table bbu.Doctor add foreign key (HospitalId) references bbu.Hospital(Id);
alter table bbu.Doctor add foreign key (PersonId) references bbu.Person(Id);

alter table bbu.Informant add foreign key (PersonId) references bbu.Person(Id);

alter table bbu.HomeAffairsOfficer add foreign key (PersonId) references bbu.Person(Id);

alter table bbu.NextOfKin add foreign key (PersonId) references bbu.Person(Id);

alter table bbu.Person add foreign key (GenderId) references bbu.Gender(Id);

create table bbu.FuneralDocumentType
(
	Id int primary key,
	Name varchar(50)
);

create table bbu.FuneralDocument
(
	Id uniqueidentifier primary key,
	Name varchar(150),
	DocumentTypeId int,
	Description varchar(1000),
	DocumentContent image,
	FuneralId uniqueidentifier
);

alter table bbu.FuneralDocument add foreign key (DocumentTypeId) references bbu.FuneralDocumentType(Id);

alter table bbu.FuneralDocument add foreign key (FuneralId) references bbu.Funeral(Id);

create table bbu.AppUser
(
	Id uniqueidentifier not null primary key,
	FirstName varchar(150),
	LastName varchar(150)
);

create table bbu.[Credential]
(
	AppUserId uniqueidentifier unique not null,
	[Password] varchar(max)
);

alter table bbu.[Credential] add foreign key (AppUserId) references bbu.AppUser(Id);

create table bbu.HomeAffairsOffice
(
	Id uniqueidentifier,
	Name varchar(150)
);

alter table bbu.HomeAffairsOfficer add HomeAffairsOfficeId uniqueidentifier;

alter table bbu.HomeAffairsOfficer add foreign key (HomeAffairsOfficeId) references bbu.HomeAffairsOffice(Id); 

