﻿using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class PersonService
    {
        public static ReturnObject InsertPerson(List<KeyValue> person)
        {
            try
            {
                var id = person.FirstOrDefault(x => x.Key == "Id")?.Value;
                var firstName = person.FirstOrDefault(x => x.Key == "FirstName")?.Value;
                var lastName = person.FirstOrDefault(x => x.Key == "LastName")?.Value;
                var saIdNumber = person.FirstOrDefault(x => x.Key == "SAIdNumber")?.Value;
                var dateOfBirth = person.FirstOrDefault(x => x.Key == "DateOfBirth")?.Value;
                var genderId = person.FirstOrDefault(x => x.Key == "GenderId")?.Value;
                var contactNumber = person.FirstOrDefault(x => x.Key == "ContactNumber")?.Value;
                var emailAddress = person.FirstOrDefault(x => x.Key == "EmailAddress")?.Value;
                var addressId = person.FirstOrDefault(x => x.Key == "AddressId")?.Value;

                var parsedDateOfBirth = dateOfBirth == null? dateOfBirth : DateTime.Parse(dateOfBirth).ToString();

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Person_create]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", id),
                            new SqlParameter("@firstName", firstName),
                            new SqlParameter("@lastName", lastName),
                            new SqlParameter("@saIdNumber", saIdNumber),
                            new SqlParameter("@dateOfBirth", parsedDateOfBirth),
                            new SqlParameter("@genderId", genderId),
                            new SqlParameter("@contactNumber", contactNumber),
                            new SqlParameter("@emailAddress", emailAddress),
                            new SqlParameter("@addressId", addressId)
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = id,
                        State = "success",
                        Message = "record was successfully created!"
                    };
                }
                else
                    return new ReturnObject()
                    {
                        Id = id,
                        State = "error",
                        Message = "an error occured while creating this record!"
                    };
            }
            catch (Exception ex)
            {
                return new ReturnObject()
                {
                    Id = "",
                    State = "error",
                    Message = ex.Message
                };
            }
        }
        public static ReturnObject UpdatePerson(List<KeyValue> person)
        {
            try
            {
                var id = person.FirstOrDefault(x => x.Key == "PersonId")?.Value;
                var firstName = person.FirstOrDefault(x => x.Key == "FirstName")?.Value;
                var lastName = person.FirstOrDefault(x => x.Key == "LastName")?.Value;
                var saIdNumber = person.FirstOrDefault(x => x.Key == "SAIdNumber")?.Value;
                var dateOfBirth = person.FirstOrDefault(x => x.Key == "DateOfBirth")?.Value;
                var genderId = person.FirstOrDefault(x => x.Key == "GenderId")?.Value;
                var contactNumber = person.FirstOrDefault(x => x.Key == "ContactNumber")?.Value;
                var emailAddress = person.FirstOrDefault(x => x.Key == "EmailAddress")?.Value;
                var addressId = person.FirstOrDefault(x => x.Key == "AddressId")?.Value;

                var parsedDateOfBirth = dateOfBirth == null ? dateOfBirth : DateTime.Parse(dateOfBirth).ToString();

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Person_update]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", id),
                            new SqlParameter("@firstName", firstName),
                            new SqlParameter("@lastName", lastName),
                            new SqlParameter("@saIdNumber", saIdNumber),
                            new SqlParameter("@dateOfBirth", parsedDateOfBirth),
                            new SqlParameter("@genderId", genderId),
                            new SqlParameter("@contactNumber", contactNumber),
                            new SqlParameter("@emailAddress", emailAddress),
                            new SqlParameter("@addressId", addressId)
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = id,
                        State = "success",
                        Message = "record was successfully updated!"
                    };
                }
                else
                    return new ReturnObject()
                    {
                        Id = id,
                        State = "error",
                        Message = "an error occured while updating this record!"
                    };
            }
            catch (Exception ex)
            {
                return new ReturnObject()
                {
                    Id = "",
                    State = "error",
                    Message = ex.Message
                };
            }
        }
    }
}
