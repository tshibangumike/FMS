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
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Funeraldocument_queryfuneraldocumentsbyfuneralid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@funeralId", funeralId),
                    });
            return records;
        }
        public static ReturnObject InsertFuneralDocument(List<KeyValue> funeralDocument, byte [] image)
        {
            try
            {
                var id = funeralDocument.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = funeralDocument.FirstOrDefault(x => x.Key == "Name")?.Value;
                var documentTypeId = funeralDocument.FirstOrDefault(x => x.Key == "DocumentTypeId")?.Value;
                var description = funeralDocument.FirstOrDefault(x => x.Key == "Description")?.Value;
                var funeralId = funeralDocument.FirstOrDefault(x => x.Key == "FuneralId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Funeraldocument_create]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", id),
                            new SqlParameter("@name", name),
                            new SqlParameter("@documentTypeId", documentTypeId),
                            new SqlParameter("@description", description),
                            new SqlParameter("@documentContent", image),
                            new SqlParameter("@funeralId", funeralId)

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
