using System.Collections.Generic;

namespace fms.Service
{
    public class PaymentPeriodService
    {
        public static List<Dictionary<string, object>> QueryActiveMonths()
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Paymentperiod_queryactivepaymentperiods]", null);
            return records;
        }
    }
}
