using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class FuneralService
    {
        public static List<Dictionary<string, object>> QueryActiveFunerals()
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Funeral_queryactivefunerals]", null);
            return records;
        }
        public static Dictionary<string, object> QueryFuneralById(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Funeral_queryfuneralbyid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@id", funeralId),
                    });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
        public static ReturnObject InsertFuneral(List<KeyValue> funeral)
        {
            try
            {

                var Id = funeral.FirstOrDefault(x => x.Key == "Id")?.Value;

                var funeralNumber = funeral.FirstOrDefault(x => x.Key == "FuneralNumber")?.Value;
                var graveNumber = funeral.FirstOrDefault(x => x.Key == "GraveNumber")?.Value;
                var deceasedId = funeral.FirstOrDefault(x => x.Key == "DeceasedId")?.Value;
                var informantId = funeral.FirstOrDefault(x => x.Key == "InformantId")?.Value;
                var doctorId = funeral.FirstOrDefault(x => x.Key == "DoctorId")?.Value;
                var nextOfKinId = funeral.FirstOrDefault(x => x.Key == "NextOfKinId")?.Value;
                var homeAffairsOfficerId = funeral.FirstOrDefault(x => x.Key == "HomeAffairsOfficerId")?.Value;
                var mortuaryId = funeral.FirstOrDefault(x => x.Key == "MortuaryId")?.Value;
                var cemeteryId = funeral.FirstOrDefault(x => x.Key == "CemeteryId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Funeral_create]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", Id),
                            new SqlParameter("@funeralNumber", funeralNumber),
                            new SqlParameter("@graveNumber", graveNumber),
                            new SqlParameter("@deceasedId", deceasedId),
                            new SqlParameter("@informantId", informantId),
                            new SqlParameter("@doctorId", doctorId),
                            new SqlParameter("@nextOfKinId", nextOfKinId),
                            new SqlParameter("@homeAffairsOfficerId", homeAffairsOfficerId),
                            new SqlParameter("@mortuaryId", mortuaryId),
                            new SqlParameter("@cemeteryId", cemeteryId)
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
        public static ReturnObject UpdateFuneral(List<KeyValue> funeral)
        {
            try
            {

                var Id = funeral.FirstOrDefault(x => x.Key == "Id")?.Value;
                var graveNumber = funeral.FirstOrDefault(x => x.Key == "GraveNumber")?.Value;
                var informantId = funeral.FirstOrDefault(x => x.Key == "InformantId")?.Value;
                var doctorId = funeral.FirstOrDefault(x => x.Key == "DoctorId")?.Value;
                var nextOfKinId = funeral.FirstOrDefault(x => x.Key == "NextOfKinId")?.Value;
                var homeAffairsOfficerId = funeral.FirstOrDefault(x => x.Key == "HomeAffairsOfficerId")?.Value;
                var mortuaryId = funeral.FirstOrDefault(x => x.Key == "MortuaryId")?.Value;
                var cemeteryId = funeral.FirstOrDefault(x => x.Key == "CemeteryId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Funeral_update]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", Id),
                            new SqlParameter("@graveNumber", graveNumber),
                            new SqlParameter("@informantId", informantId),
                            new SqlParameter("@doctorId", doctorId),
                            new SqlParameter("@nextOfKinId", nextOfKinId),
                            new SqlParameter("@homeAffairsOfficerId", homeAffairsOfficerId),
                            new SqlParameter("@mortuaryId", mortuaryId),
                            new SqlParameter("@cemeteryId", cemeteryId)
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = Id,
                        State = "success",
                        Message = "record was successfully updated!"
                    };
                }
                else
                    return new ReturnObject()
                    {
                        Id = Id,
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
