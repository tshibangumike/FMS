using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fms.Service
{
    public class CredentialService
    {
        public static Dictionary<string, object> QueryCredentialByUsernameByPassword(string username, string password)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Credential_querycredentialbyusernamebypassword]",
                new List<SqlParameter> {
                    new SqlParameter("@username", username),
                    new SqlParameter("@password", password)});
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
    }
}
