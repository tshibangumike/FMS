using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class InformantService
    {
        public static Dictionary<string, object> QueryInformantById(Guid informantId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Informant_queryinformantbyid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@id", informantId),
                });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static Dictionary<string, object> QueryInformantByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Informant_queryinformantbyfuneralid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@funeralId", funeralId),
                });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static List<Dictionary<string, object>> QueryActiveInformants()
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Informant_queryactiveinformants]", null);
            return records;
        }

        public static int QueryCountOfInformantsByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure(
                "[bbu].[Informant_querycountofinformantsbyfuneralid]",
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

        public static ReturnObject InsertInformant(List<KeyValue> informant)
        {
            try
            {

                var personId = informant.FirstOrDefault(x => x.Key == "PersonId")?.Value;
                var relationshipToDeceased = informant.FirstOrDefault(x => x.Key == "RelationshipToDeceased")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Informant_create]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@personId", personId),
                        new SqlParameter("@relationshipToDeceased", relationshipToDeceased),
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
                else
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

        public static ReturnObject UpdateInformant(List<KeyValue> informant)
        {
            try
            {

                var personId = informant.FirstOrDefault(x => x.Key == "Id")?.Value;
                var relationshipToDeceased = informant.FirstOrDefault(x => x.Key == "RelationshipToDeceased")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Informant_update]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@personId", personId),
                        new SqlParameter("@relationshipToDeceased", relationshipToDeceased),
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = personId,
                        State = "success",
                        Message = "record was successfully updated!"
                    };
                }

                return new ReturnObject()
                {
                    Id = personId,
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
