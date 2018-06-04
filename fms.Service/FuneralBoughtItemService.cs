using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class FuneralBoughtItemService
    {
        public static List<Dictionary<string, object>> QueryFuneralBoughtItemsByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Funeralboughtitem_queryfuneralboughtitembyfuneralid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@funeralId", funeralId),
                    });
            return records;
        }
        public static ReturnObject InsertFuneralBoughtItem(List<KeyValue> funeralBoughtItem)
        {
            try
            {

                var Id = funeralBoughtItem.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = funeralBoughtItem.FirstOrDefault(x => x.Key == "Name")?.Value;
                var amount = funeralBoughtItem.FirstOrDefault(x => x.Key == "Amount")?.Value;
                var quantity = funeralBoughtItem.FirstOrDefault(x => x.Key == "Quantity")?.Value;
                var funeralId = funeralBoughtItem.FirstOrDefault(x => x.Key == "FuneralId")?.Value;
                var supplierId = funeralBoughtItem.FirstOrDefault(x => x.Key == "SupplierId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Funeralboughtitem_create]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", Id),
                            new SqlParameter("@name", name),
                            new SqlParameter("@amount", amount),
                            new SqlParameter("@quantity", quantity),
                            new SqlParameter("@funeralId", funeralId),
                            new SqlParameter("@supplierId", supplierId)
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
        public static ReturnObject UpdateFuneralBoughtItem(List<KeyValue> funeralBoughtItem)
        {
            try
            {

                var Id = funeralBoughtItem.FirstOrDefault(x => x.Key == "Id")?.Value;
                var name = funeralBoughtItem.FirstOrDefault(x => x.Key == "Name")?.Value;
                var amount = funeralBoughtItem.FirstOrDefault(x => x.Key == "Amount")?.Value;
                var quantity = funeralBoughtItem.FirstOrDefault(x => x.Key == "Quantity")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Funeralboughtitem_update]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@id", Id),
                            new SqlParameter("@name", name),
                            new SqlParameter("@amount", amount),
                            new SqlParameter("@quantity", quantity)
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
