using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class HospitalService
    {
        public static List<Dictionary<string, object>> QueryHospitals()
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Hospital_queryhospitals]", null);
            return records;
        }
        public static Hospital QueryHospitalsById(Guid id)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Hospital_queryhospitalbyid]",
                new List<SqlParameter> { new SqlParameter("@id", id) });
            if (records != null && records.Count == 1)
            {
                var _id = (Guid)records[0].FirstOrDefault(x => x.Key == "Id").Value;
                var _name = (string)records[0].FirstOrDefault(x => x.Key == "Name").Value;
                var _addressId = string.IsNullOrEmpty(records[0].FirstOrDefault(x => x.Key == "AddressId").Value.ToString())
                    ? Guid.Empty
                    : (Guid)records[0].FirstOrDefault(x => x.Key == "AddressId").Value;
                return new Hospital()
                {
                    Id = _id,
                    Name = _name,
                    AddressId = _addressId
                };
            }
            return null;
        }
        public static List<Dictionary<string, object>> QueryHospitalsByName(string searchText)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Hospital_queryhospitalbyname]",
                new List<SqlParameter> { new SqlParameter("@searchText", searchText) });
            return records;
        }
        public static ReturnObject InsertHospital(Hospital hospital)
        {
            try
            {
                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Hospital_create]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", hospital.Id),
                            new SqlParameter("@name", hospital.Name)

                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = hospital.Id.ToString(),
                        State = "success",
                        Message = "record was successfully created!"
                    };
                }
                else
                    return new ReturnObject()
                    {
                        Id = hospital.Id.ToString(),
                        State = "error",
                        Message = "an error occured while creating this record!"
                    };
            }
            catch (Exception ex)
            {
                return new ReturnObject()
                {
                    Id = hospital.Id.ToString(),
                    State = "error",
                    Message = ex.Message
                };
            }
        }
    }
}
