using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class HomeAffairsOfficerService
    {
        public static List<Dictionary<string, object>> QueryActiveHomeAffairsOfficers(int pageNumber, int listType)
        {
            var records =
                SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Homeaffairsofficer_queryactivehomeaffairsofficers]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@pagenumber", pageNumber),
                        new SqlParameter("@listtype", listType),
                    });
            return records;
        }

        public static Dictionary<string, object> QueryHomeAffairsOfficerById(Guid homeAffairsOfficerId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure(
                "[bbu].[Homeaffairsofficer_queryhomeaffairsofficerbyid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@id", homeAffairsOfficerId),
                });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static Dictionary<string, object> QueryHomeAffairsOfficerByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure(
                "[bbu].[Homeaffairsofficer_queryhomeaffairsofficerbyfuneralid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@funeralId", funeralId),
                });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static int QueryCountOfHomeAffairsOfficersByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure(
                "[bbu].[Homeaffairsofficer_querycountofhomeaffairsofficersbyfuneralid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@funeralId", funeralId),
                });
            if (records != null && records.Count == 1)
            {
                var count = records[0].FirstOrDefault(x => x.Key == "Count").Value;
                if (count == null) return -1;
                else return (int) count;
            }

            return -1;
        }

        public static ReturnObject InsertHomeAffairesOfficer(List<KeyValue> homeAffairsOfficer)
        {
            try
            {

                var personId = homeAffairsOfficer.FirstOrDefault(x => x.Key == "PersonId")?.Value;
                var homeAffairsOfficeId = homeAffairsOfficer.FirstOrDefault(x => x.Key == "HomeAffairsOfficeId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[HomeAffairsOfficer_create]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@personId", personId),
                        new SqlParameter("@homeAffairsOfficeId", homeAffairsOfficeId),
                        new SqlParameter("@stateId", 1)
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = personId,
                        State = "success",
                        Message = "record was successfully created!"
                    };
                }

                return new ReturnObject()
                {
                    Id = personId,
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
