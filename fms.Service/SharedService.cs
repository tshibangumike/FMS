using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using log4net;

namespace fms.Service
{
    public class SharedService
    {

        private static readonly Random Random = new Random();

        private static readonly string ConnectionString =
            ConfigurationManager.ConnectionStrings["fmsContext"].ConnectionString;

        private static readonly ILog Log = Log4NetService.GetLog4Net(typeof(SharedService));

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
                    resultParameter.Direction = ParameterDirection.Output;
                    resultParameter.DbType = DbType.Int32;
                    resultParameter.Value = -1;

                    if (listSqlParameter != null)
                    {
                        foreach (var parameter in listSqlParameter)
                        {
                            command.Parameters.Add(parameter);
                        }

                        command.Parameters.Add(resultParameter);
                    }

                    command.ExecuteNonQuery();
                    return (int) resultParameter.Value;
                }
                catch (Exception ex)
                {
                    Log.Error("ExecutePostSqlStoredProcedure - " + storedProcedureName, ex);
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
                    Log.Error("ExecutePostSqlStoredProcedure", ex);
                }
            }

            return null;
        }

        public static DataTable ExecuteGetDtSqlStoredProcedure(string sqlQuery,
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
                    return dataTableResult;
                }
                catch (Exception ex)
                {
                    Log.Error("ExecutePostSqlStoredProcedure", ex);
                }
            }

            return null;
        }

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[Random.Next(s.Length)]).ToArray());
        }

    }
}
