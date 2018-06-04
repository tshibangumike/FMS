using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class AddressService
    {
        public static ReturnObject InsertAddress(List<KeyValue> address)
        {
            try
            {

                var Id = address.FirstOrDefault(x => x.Key == "Id")?.Value;
                var fullAddress = address.FirstOrDefault(x => x.Key == "FullAddress")?.Value;
                var streetNumber = address.FirstOrDefault(x => x.Key == "StreetNumber")?.Value;
                var streetAddress = address.FirstOrDefault(x => x.Key == "StreetAddress")?.Value;
                var subLocality = address.FirstOrDefault(x => x.Key == "SubLocality")?.Value;
                var city = address.FirstOrDefault(x => x.Key == "City")?.Value;
                var province = address.FirstOrDefault(x => x.Key == "Province")?.Value;
                var country = address.FirstOrDefault(x => x.Key == "Country")?.Value;
                var postalCode = address.FirstOrDefault(x => x.Key == "PostalCode")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Address_create]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", Id),
                            new SqlParameter("@fullAddress", fullAddress),
                            new SqlParameter("@streetNumber", streetNumber),
                            new SqlParameter("@streetAddress", streetAddress),
                            new SqlParameter("@subLocality", subLocality),
                            new SqlParameter("@city", city),
                            new SqlParameter("@province", province),
                            new SqlParameter("@country", country),
                            new SqlParameter("@postalCode", postalCode)
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = Id,
                        State = "success",
                        Message = "record was successfully created!"
                    };
                }
                else
                    return new ReturnObject()
                    {
                        Id = Id,
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
    }
}
