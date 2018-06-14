using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace fms.Service
{
    public class AppUserService
    {
        public static Dictionary<string, object> QueryAppUserById (Guid appUserId) 
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Appuser_queryappuserbyid]",
            new List<SqlParameter> { new SqlParameter("@appUserId", appUserId) });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
    }
}
