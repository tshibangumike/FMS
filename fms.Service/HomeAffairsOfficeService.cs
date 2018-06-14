using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using fms.Model;

namespace fms.Service
{
    public class HomeAffairsOfficeService
    {
        public static Dictionary<string, object> QueryActiveHomeAffairsOffices(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Homeaffairsofficer_queryhomeaffairsofficerbyfuneralid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@funeralId", funeralId),
                    });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
    }
}
