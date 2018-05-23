using fms.Model;
using fms.Service;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fms.ConsoleApp
{
    class Program
    {
        static void Main(string[] args)
        {

            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Hospital_queryhospitalbyid]",
                new List<SqlParameter> { new SqlParameter("@id", "A62C2FD8-15C2-4DDD-A736-01C45E79B52B") });
            if (records != null && records.Count == 1)
            {
                var _id = (Guid)records[0].FirstOrDefault(x => x.Key == "Id").Value;
                var _name = (string)records[0].FirstOrDefault(x => x.Key == "Name").Value;
                var _addressId = string.IsNullOrEmpty(records[0].FirstOrDefault(x => x.Key == "AddressId").Value.ToString())
                    ? Guid.Empty
                    : (Guid)records[0].FirstOrDefault(x => x.Key == "AddressId").Value;
            }

        }
    }
}
