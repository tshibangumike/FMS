using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace fms.Service
{
    public class ReportService
    {

        public static DataTable GetConfirmationLetterReportData(Guid funeralId)
        {
            var records = SharedService.ExecuteGetDtSqlStoredProcedure("[bbu].[Report_confirmationletter]",
                new List<SqlParameter>
                {
                    new SqlParameter("@funeralId", funeralId),
                });
            return records;
        }
        public static DataTable GetFuneralDetailReportData(Guid funeralId)
        {
            var records = SharedService.ExecuteGetDtSqlStoredProcedure("[bbu].[Report_invoice_funeraldetail]",
                new List<SqlParameter>
                {
                    new SqlParameter("@funeralId", funeralId),
                });
            return records;
        }
        public static DataTable GetBankAccountReportData()
        {
            var records = SharedService.ExecuteGetDtSqlStoredProcedure("[bbu].[Report_invoice_bankaccount]", null);
            return records;
        }
        public static DataTable GetItemsBoughtReportData(Guid funeralId)
        {
            var records = SharedService.ExecuteGetDtSqlStoredProcedure("[bbu].[Report_invoice_itemsbought]",
                new List<SqlParameter>
                {
                    new SqlParameter("@funeralId", funeralId),
                });
            return records;
        }
    }
}
