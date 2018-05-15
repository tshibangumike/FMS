create table bbu.Funeral 
(
	Id uniqueidentifier not null primary key,
	FuneralNumber varchar(6),
	DateOfDeath datetime,
	PlaceOfDeath varchar(1000),
	WhereWasTheBodyRetrieved varchar(1000),
	CauseOfDeath varchar(max),
	GraveNumber varchar(50),
	DeceasedId uniqueidentifier not null,
	InformantId uniqueidentifier,
	NextOfKinId uniqueidentifier,
	DoctorId uniqueidentifier,
	HomeAffairsOfficerId uniqueidentifier,
	MortuaryId uniqueidentifier
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

create table bbu.Deceased
(
	PersonId uniqueidentifier not null primary key,
	FuneralId uniqueidentifier
);

create table bbu.Gender
(
	Id int not null primary key,
	Name varchar(20)
);

create table bbu.Informant
(
	PersonId uniqueidentifier not null primary key,
);

create table bbu.NextOfKin
(
	PersonId uniqueidentifier not null primary key,
);

create table bbu.Doctor
(
	PersonId uniqueidentifier not null primary key,
	HospitalId uniqueidentifier
);

create table bbu.HomeAffairsOfficer
(
	PersonId uniqueidentifier not null primary key
);

create table bbu.Person
(
	Id uniqueidentifier not null primary key,
	FirstName varchar(150) not null,
	LastName varchar(150) not null,
	SAIdNumber varchar(13),
	DateOfBirth datetime not null,
	GenderId int not null,
	AddressId uniqueidentifier
);

alter table bbu.Funeral add foreign key (DeceasedId) references bbu.Deceased(PersonId);
alter table bbu.Funeral add foreign key (InformantId) references bbu.Informant(PersonId);
alter table bbu.Funeral add foreign key (NextOfKinId) references bbu.NextOfKin(PersonId);
alter table bbu.Funeral add foreign key (DoctorId) references bbu.Doctor(PersonId);
alter table bbu.Funeral add foreign key (HomeAffairsOfficerId) references bbu.HomeAffairsOfficer(PersonId);
alter table bbu.Funeral add foreign key (MortuaryId) references bbu.Mortuary(Id);

alter table bbu.Cemetery add foreign key (AddressId) references bbu.[Address](Id);

alter table bbu.Hospital add foreign key (AddressId) references bbu.[Address](Id);

alter table bbu.Mortuary add foreign key (AddressId) references bbu.[Address](Id);

alter table bbu.Deceased add foreign key (FuneralId) references bbu.Funeral(Id);

alter table bbu.Doctor add foreign key (HospitalId) references bbu.Hospital(Id);

alter table bbu.Person add foreign key (GenderId) references bbu.Gender(Id);
