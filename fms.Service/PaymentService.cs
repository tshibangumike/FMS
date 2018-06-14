using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using fms.Model;

namespace fms.Service
{
    public class PaymentService
    {
        public static ReturnObject InsertPayment(List<KeyValue> payment)
        {
            try
            {

                var id = payment.FirstOrDefault(x => x.Key == "Id")?.Value;
                var memberId = payment.FirstOrDefault(x => x.Key == "MemberId")?.Value;
                var amount = payment.FirstOrDefault(x => x.Key == "Amount")?.Value;
                var paymentDate = payment.FirstOrDefault(x => x.Key == "PaymentDate")?.Value;
                var documentId = payment.FirstOrDefault(x => x.Key == "DocumentId")?.Value;
                var paymentPeriodId = payment.FirstOrDefault(x => x.Key == "PaymentPeriodId")?.Value;
                var createdOn = payment.FirstOrDefault(x => x.Key == "CreatedOn")?.Value;
                var createdById = payment.FirstOrDefault(x => x.Key == "CreatedById")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Payment_create]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@id", id),
                        new SqlParameter("@memberId", memberId),
                        new SqlParameter("@amount", amount),
                        new SqlParameter("@paymentDate", paymentDate),
                        new SqlParameter("@documentId", documentId),
                        new SqlParameter("@paymentPeriodId", paymentPeriodId),
                        new SqlParameter("@createdOn", createdOn),
                        new SqlParameter("@createdById", createdById)
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

        public static List<Dictionary<string, object>> QueryPaymentsByMemberId(Guid memberId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Payment_querypaymentsbymemberid]",
                new List<SqlParameter>
                {
                    new SqlParameter("@memberId", memberId),
                });
            return records;
        }
    }
}
