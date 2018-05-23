using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class SharedService
    {

        private static readonly string ConnectionString =
            ConfigurationManager.ConnectionStrings["fmsContext"].ConnectionString;

        public static int ExecutePostSqlStoredProcedure(string storedProcedureName,
            List<SqlParameter> listSqlParameter)
        {
            using (var sqlConnection = new SqlConnection(ConnectionString))
            {
                sqlConnection.Open();
                try
                {
                    var command = new SqlCommand
                    {
                        CommandText = storedProcedureName,
                        Connection = sqlConnection,
                        CommandType = CommandType.StoredProcedure
                    };

                    var resultParameter = command.CreateParameter();
                    resultParameter.ParameterName = "@result";
                    resultParameter.Direction = System.Data.ParameterDirection.Output;
                    resultParameter.DbType = System.Data.DbType.Int32;
                    resultParameter.Value = -1;

                    if (listSqlParameter != null)
                    {
                        foreach (var parameter in listSqlParameter)
                        {
                            command.Parameters.Add(parameter);
                        }
                        command.Parameters.Add(resultParameter);
                    }

                    var result = command.ExecuteNonQuery();
                    return (int)resultParameter.Value;
                }
                catch (Exception ex)
                {
                }
            }
            return -1;
        }

        public static List<Dictionary<string, object>> ExecuteGetSqlStoredProcedure(string sqlQuery,
            List<SqlParameter> listSqlParameter)
        {
            var dataTableResult = new DataTable();
            using (var sqlConnection = new SqlConnection(ConnectionString))
            {
                sqlConnection.Open();
                try
                {
                    var command = new SqlCommand
                    {
                        CommandText = sqlQuery,
                        Connection = sqlConnection,
                        CommandType = CommandType.StoredProcedure
                    };
                    if (listSqlParameter != null)
                    {
                        foreach (var parameter in listSqlParameter)
                        {
                            command.Parameters.Add(parameter);
                        }
                    }

                    var adapter = new SqlDataAdapter(command);
                    adapter.Fill(dataTableResult);
                    var records = (from DataRow dr in dataTableResult.Rows
                                   select
                                       dataTableResult.Columns.Cast<DataColumn>()
                                           .ToDictionary(col => col.ColumnName, col => dr[col])).ToList();
                    return records;
                }
                catch (Exception ex)
                {
                }
            }

            return null;
        }

        private static Random random = new Random();
        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static void UpdateAttributeToKeyValueObject(List<KeyValue> keyValue, string key, string value)
        {
            if (keyValue.Any(x => x.Key == key))
            {
                keyValue.FirstOrDefault(x => x.Key == key).Value = value;
            }
            else
            {
                keyValue.Add(new KeyValue()
                {
                    Key = key,
                    Value = value
                });
            }
        }

        public static void AddAttributeToKeyValueObject(List<KeyValue> keyValue, string key, string value)
        {
            keyValue.Add(new KeyValue()
            {
                Key = key,
                Value = value
            });
        }

    }
}
