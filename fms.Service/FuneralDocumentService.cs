using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class FuneralDocumentService
    {
        public static List<Dictionary<string, object>> QueryFuneralDocumentsByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure(
                "[bbu].[Funeraldocument_queryfuneraldocumentsbyfuneralid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@funeralId", funeralId),
                });
            return records;
        }

        public static Dictionary<string, object> QueryFuneralDocumentById(Guid funeralDocumentId)
        {
            var record = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Funeraldocument_queryfuneraldocumentbyid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@id", funeralDocumentId),
                });
            return record[0];
        }

        public static ReturnObject InsertFuneralDocument(List<KeyValue> funeralDocument, byte[] image)
        {
            try
            {
                var id = funeralDocument.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = funeralDocument.FirstOrDefault(x => x.Key == "Name")?.Value;
                var description = funeralDocument.FirstOrDefault(x => x.Key == "Description")?.Value;
                var funeralId = funeralDocument.FirstOrDefault(x => x.Key == "FuneralId")?.Value;
                var createdById = funeralDocument.FirstOrDefault(x => x.Key == "CreatedById")?.Value;
                var createdOn = funeralDocument.FirstOrDefault(x => x.Key == "CreatedOn")?.Value;
                var modifiedById = funeralDocument.FirstOrDefault(x => x.Key == "ModifiedById")?.Value;
                var modifiedOn = funeralDocument.FirstOrDefault(x => x.Key == "ModifiedOn")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Funeraldocument_create]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@id", id),
                        new SqlParameter("@name", name),
                        new SqlParameter("@description", description),
                        new SqlParameter("@funeralId", funeralId),
                        new SqlParameter("@createdById", createdById),
                        new SqlParameter("@createdOn", createdOn),
                        new SqlParameter("@modifiedById", modifiedById),
                        new SqlParameter("@modifiedOn", modifiedOn),
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
