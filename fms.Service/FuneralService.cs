using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
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
                var createdById = funeral.FirstOrDefault(x => x.Key == "CreatedById")?.Value;
                var createdOn = funeral.FirstOrDefault(x => x.Key == "CreatedOn")?.Value;
                var modifiedById = funeral.FirstOrDefault(x => x.Key == "ModifiedById")?.Value;
                var modifiedOn = funeral.FirstOrDefault(x => x.Key == "ModifiedOn")?.Value;

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
                        new SqlParameter("@cemeteryId", cemeteryId),
                        new SqlParameter("@createdById", createdById),
                        new SqlParameter("@createdOn", createdOn),
                        new SqlParameter("@modifiedById", modifiedById),
                        new SqlParameter("@modifiedOn", modifiedOn)
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

                var id = funeral.FirstOrDefault(x => x.Key == "Id")?.Value;
                var graveNumber = funeral.FirstOrDefault(x => x.Key == "GraveNumber")?.Value;
                var informantId = funeral.FirstOrDefault(x => x.Key == "InformantId")?.Value;
                var doctorId = funeral.FirstOrDefault(x => x.Key == "DoctorId")?.Value;
                var nextOfKinId = funeral.FirstOrDefault(x => x.Key == "NextOfKinId")?.Value;
                var homeAffairsOfficerId = funeral.FirstOrDefault(x => x.Key == "HomeAffairsOfficerId")?.Value;
                var mortuaryId = funeral.FirstOrDefault(x => x.Key == "MortuaryId")?.Value;
                var cemeteryId = funeral.FirstOrDefault(x => x.Key == "CemeteryId")?.Value;
                var burialDate = funeral.FirstOrDefault(x => x.Key == "BurialDate")?.Value;
                var modifiedById = funeral.FirstOrDefault(x => x.Key == "ModifiedById")?.Value;

                var parsedBurialDate = burialDate == null
                    ? null
                    : DateTime.Parse(burialDate).ToString(CultureInfo.InvariantCulture);

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Funeral_update]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@id", id),
                        new SqlParameter("@graveNumber", graveNumber),
                        new SqlParameter("@informantId", informantId),
                        new SqlParameter("@doctorId", doctorId),
                        new SqlParameter("@nextOfKinId", nextOfKinId),
                        new SqlParameter("@homeAffairsOfficerId", homeAffairsOfficerId),
                        new SqlParameter("@mortuaryId", mortuaryId),
                        new SqlParameter("@cemeteryId", cemeteryId),
                        new SqlParameter("@burialDate", parsedBurialDate),
                        new SqlParameter("@modifiedById", modifiedById)
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = id,
                        State = "success",
                        Message = "record was successfully updated!"
                    };
                }

                return new ReturnObject()
                {
                    Id = id,
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
