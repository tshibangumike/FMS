using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class CemeteryService
    {
        public static List<Dictionary<string, object>> QueryActiveCemeteries()
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Cemetery_queryactivecemetries]", null);
            return records;
        }
        public static Dictionary<string, object> QueryCemeteryById(Guid cemeteryId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Cemetery_querycemeterybyid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@id", cemeteryId),
                    });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
        public static List<Dictionary<string, object>> QueryCemeteriesByName(string searchText)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Cemetery_querycemeterybyname]",
                new List<SqlParameter> { new SqlParameter("@searchText", searchText) });
            return records;
        }
        public static ReturnObject InsertCemetery(List<KeyValue> cemetery)
        {
            try
            {
                var id = cemetery.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = cemetery.FirstOrDefault(x => x.Key == "Name")?.Value;
                var addressId = cemetery.FirstOrDefault(x => x.Key == "AddressId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Cemetery_create]",
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
