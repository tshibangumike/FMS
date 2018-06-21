using System;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace fms.Service
{
    public class NumberConfigurationService
    {
        public static Dictionary<string, object> GetNextNumber(string entityName)
        {

            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Numberconfiguration_querybyentityname]",
                new List<SqlParameter>
                {
                    new SqlParameter("@entityName", entityName)
                });
            if (records != null && records.Count == 1) return records[0];
            return null;

        }

        public static void SetNextNumber(string numberConfigurationId, string entityName, int nextNumber)
        {
            SharedService.ExecutePostSqlStoredProcedure("[bbu].[Numberconfiguration_updatenextnumber]",
                new List<SqlParameter>
                {
                    new SqlParameter("@id", numberConfigurationId),
                    new SqlParameter("@entityName", entityName),
                    new SqlParameter("@nextNumber", nextNumber)
                });

        }
    }
}
