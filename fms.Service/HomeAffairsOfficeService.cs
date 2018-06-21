using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using fms.Model;

namespace fms.Service
{
    public class HomeAffairsOfficeService
    {
        public static List<Dictionary<string, object>> QueryActiveHomeAffairsOffices(int pageNumber, int listType)
        {
            var records =
                SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Homeaffairsoffice_queryactivehomeaffairsoffices]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@pagenumber", pageNumber),
                        new SqlParameter("@listtype", listType),
                    });
            return records;
        }

        public static Dictionary<string, object> QueryHomeAffairsOfficeById(Guid hosptitalId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure(
                "[bbu].[HomeAffairsOffice_queryHomeAffairsOfficebyid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@id", hosptitalId),
                });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static ReturnObject InsertHomeAffairsOffice(List<KeyValue> hospital)
        {
            try
            {
                var id = hospital.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = hospital.FirstOrDefault(x => x.Key == "Name")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[HomeAffairsOffice_create]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@id", id),
                        new SqlParameter("@name", name),
                        new SqlParameter("@stateId", 1)

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
