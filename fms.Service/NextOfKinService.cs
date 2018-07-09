using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class NextOfKinService
    {
        public static List<Dictionary<string, object>> QueryActiveNextOfKins(int pageNumber, int listType)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[NextOfKin_queryactivenextofkins]",
                new List<SqlParameter>
                {
                    new SqlParameter("@pagenumber", pageNumber),
                    new SqlParameter("@listtype", listType),
                });
            return records;
        }

        public static Dictionary<string, object> QueryNextOfKinById(Guid nextOfKinId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[NextOfKin_querynextofkinbyid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@id", nextOfKinId),
                });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static Dictionary<string, object> QueryNextOfKinByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[NextOfKin_querynextofkinbyfuneralid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@funeralId", funeralId),
                });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static int QueryCountOfNextOsKinssByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure(
                "[bbu].[Nextofkin_querycountofnextofkinsbyfuneralid]",
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

        public static ReturnObject InsertNextOfKin(List<KeyValue> nextOfKin)
        {
            try
            {

                var personId = nextOfKin.FirstOrDefault(x => x.Key == "PersonId")?.Value;
                var relationshipToDeceased = nextOfKin.FirstOrDefault(x => x.Key == "RelationshipToDeceased")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[NextOfKin_create]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@personId", personId),
                        new SqlParameter("@relationshipToDeceased", relationshipToDeceased),
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

        public static ReturnObject UpdateNextOfKin(List<KeyValue> nextOfKin)
        {
            try
            {

                var personId = nextOfKin.FirstOrDefault(x => x.Key == "Id")?.Value;
                var relationshipToDeceased = nextOfKin.FirstOrDefault(x => x.Key == "RelationshipToDeceased")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[NextOfKin_update]",
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

        public static ReturnObject DeactivateNextOfKin(Guid nextOfKinId)
        {
            try
            {
                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Homeaffairsofficer_deactivate]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@id", nextOfKinId)
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = nextOfKinId.ToString(),
                        State = "success",
                        Message = "record was successfully updated!"
                    };
                }

                return new ReturnObject()
                {
                    Id = nextOfKinId.ToString(),
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
