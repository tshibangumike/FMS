using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class MortuaryService
    {
        public static List<Dictionary<string, object>> QueryActiveMortuaries(int pageNumber, int listType)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Mortuary_queryactivemortuaries]",
                new List<SqlParameter>
                {
                    new SqlParameter("@pagenumber", pageNumber),
                    new SqlParameter("@listtype", listType),
                });
            return records;
        }

        public static Dictionary<string, object> QueryMortuaryById(Guid mortuaryId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Mortuary_querymortuarybyid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@id", mortuaryId),
                });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static List<Dictionary<string, object>> QueryMortuariesByName(string searchText)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Mortuary_querymortuarybyname]",
                new List<SqlParameter> {new SqlParameter("@searchText", searchText)});
            return records;
        }

        public static ReturnObject InsertMortuary(List<KeyValue> mortuary)
        {
            try
            {
                var id = mortuary.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = mortuary.FirstOrDefault(x => x.Key == "Name")?.Value;
                var addressId = mortuary.FirstOrDefault(x => x.Key == "AddressId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Mortuary_create]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@id", id),
                        new SqlParameter("@name", name),
                        new SqlParameter("@addressId", addressId),
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
