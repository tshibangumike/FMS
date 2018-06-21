using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using fms.Model;

namespace fms.Service
{
    public class DocumentService
    {
        public static Dictionary<string, object> QueryDocumentById(Guid documentId)
        {
            var record = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Document_querydocumentbyid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@id", documentId),
                });
            return record[0];
        }

        public static ReturnObject InsertDocument(List<KeyValue> document, byte[] fileContent)
        {
            try
            {
                var id = document.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = document.FirstOrDefault(x => x.Key == "Name")?.Value;
                var fileName = document.FirstOrDefault(x => x.Key == "FileName")?.Value;
                var mimeType = document.FirstOrDefault(x => x.Key == "MimeType")?.Value;
                var size = document.FirstOrDefault(x => x.Key == "Size")?.Value;
                var createdById = document.FirstOrDefault(x => x.Key == "CreatedById")?.Value;
                var createdOn = document.FirstOrDefault(x => x.Key == "CreatedOn")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Document_create]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@id", id),
                        new SqlParameter("@fileName", fileName),
                        new SqlParameter("@mimeType", mimeType),
                        new SqlParameter("@size", size),
                        new SqlParameter("@fileContent", fileContent),
                        new SqlParameter("@createdOn", createdOn),
                        new SqlParameter("@createdById", createdById),
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
