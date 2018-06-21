using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class SupplierService
    {
        public static List<Dictionary<string, object>> QueryActiveSuppliers(int pageNumber, int listType)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Supplier_queryactivesuppliers]",
                new List<SqlParameter>
                {
                    new SqlParameter("@pagenumber", pageNumber),
                    new SqlParameter("@listtype", listType),
                });
            return records;
        }

        public static ReturnObject InsertSupplier(List<KeyValue> supplier)
        {
            try
            {
                var id = supplier.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = supplier.FirstOrDefault(x => x.Key == "Name")?.Value;
                var addressId = supplier.FirstOrDefault(x => x.Key == "AddressId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Supplier_create]",
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
                    Id = id,
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
