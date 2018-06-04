using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class DeceasedService
    {
        public static List<Dictionary<string, object>> QueryActiveDeceaseds()
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Deceased_queryactivedeceaseds]", null);
            return records;
        }
        public static Dictionary<string, object> QueryDeceasedById(Guid deceasedId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Deceased_querydeceasedbyid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@id", deceasedId),
                    });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
        public static Dictionary<string, object> QueryDeceasedByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Deceased_querydeceasedbyfuneralid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@funeralId", funeralId),
                    });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
        public static ReturnObject InsertDeceased(List<KeyValue> deceased)
        {
            try
            {
                var personId = deceased.FirstOrDefault(x => x.Key == "PersonId")?.Value;
                var dateOfDeath = deceased.FirstOrDefault(x => x.Key == "DateOfDeath")?.Value;
                var placeOfDeath = deceased.FirstOrDefault(x => x.Key == "PlaceOfDeath")?.Value;
                var whereWasTheBodyRetrieved = deceased.FirstOrDefault(x => x.Key == "WhereWasTheBodyRetrieved")?.Value;
                var causeOfDeath = deceased.FirstOrDefault(x => x.Key == "CauseOfDeath")?.Value;

                var parsedDateOfDeath = dateOfDeath == null ? dateOfDeath : DateTime.Parse(dateOfDeath).ToString();

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Deceased_create]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@personId", personId),
                            new SqlParameter("@dateOfDeath", parsedDateOfDeath),
                            new SqlParameter("@placeOfDeath", placeOfDeath),
                            new SqlParameter("@whereWasTheBodyRetrieved", whereWasTheBodyRetrieved),
                            new SqlParameter("@causeOfDeath", causeOfDeath)
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
        public static ReturnObject UpdateDeceased(List<KeyValue> deceased)
        {
            try
            {
                var personId = deceased.FirstOrDefault(x => x.Key == "Id")?.Value;
                var dateOfDeath = deceased.FirstOrDefault(x => x.Key == "DateOfDeath")?.Value;
                var placeOfDeath = deceased.FirstOrDefault(x => x.Key == "PlaceOfDeath")?.Value;
                var whereWasTheBodyRetrieved = deceased.FirstOrDefault(x => x.Key == "WhereWasTheBodyRetrieved")?.Value;
                var causeOfDeath = deceased.FirstOrDefault(x => x.Key == "CauseOfDeath")?.Value;

                var parsedDateOfDeath = dateOfDeath == null ? dateOfDeath : DateTime.Parse(dateOfDeath).ToString();

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Deceased_update]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@personId", personId),
                            new SqlParameter("@dateOfDeath", parsedDateOfDeath),
                            new SqlParameter("@placeOfDeath", placeOfDeath),
                            new SqlParameter("@whereWasTheBodyRetrieved", whereWasTheBodyRetrieved),
                            new SqlParameter("@causeOfDeath", causeOfDeath),
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
                else
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
