using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class HospitalService
    {
        public static List<Dictionary<string, object>> QueryActiveHospitals()
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Hospital_queryactivehospitals]", null);
            return records;
        }
        public static Dictionary<string, object> QueryHospitalById(Guid hosptitalId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Hospital_queryhospitalbyid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@id", hosptitalId),
                    });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
        public static List<Dictionary<string, object>> QueryHospitalsByName(string searchText)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Hospital_queryhospitalbyname]",
                new List<SqlParameter> { new SqlParameter("@searchText", searchText) });
            return records;
        }
        public static ReturnObject InsertHospital(List<KeyValue> hospital)
        {
            try
            {
                var id = hospital.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = hospital.FirstOrDefault(x => x.Key == "Name")?.Value;
                var addressId = hospital.FirstOrDefault(x => x.Key == "AddressId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Hospital_create]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", id),
                            new SqlParameter("@name", name),
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
                        Id = "",
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
