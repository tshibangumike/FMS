using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class DoctorService
    {
        public static Dictionary<string, object> QueryDoctorById(Guid doctorId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Doctor_querydoctorbyid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@id", doctorId),
                    });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
        public static Dictionary<string, object> QueryDoctorByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Doctor_querydoctorbyfuneralid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@funeralId", funeralId),
                    });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }
        public static List<Dictionary<string, object>> QueryActiveDoctors()
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Doctor_queryactivedoctors]", null);
            return records;
        }
        public static int QueryCountOfDoctorsByFuneralId(Guid funeralId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Doctor_querycountofdoctorsbyfuneralid]",
                 new List<SqlParameter>
                    {
                            new SqlParameter("@funeralId", funeralId),
                    });
            if (records != null && records.Count == 1)
            {
                var count = records[0].FirstOrDefault(x => x.Key == "Count").Value;
                if (count == null) return -1;
                else return (int)count;
            }
            return -1;
        }
        public static ReturnObject InsertDoctor(List<KeyValue> doctor)
        {
            try
            {

                var personId = doctor.FirstOrDefault(x => x.Key == "PersonId")?.Value;
                var hospitalId = doctor.FirstOrDefault(x => x.Key == "HospitalId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Doctor_create]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@personId", personId),
                            new SqlParameter("@hospitalId", hospitalId),
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = personId,
                        State = "success",
                        Message = "record was successfully created!"
                    };
                }
                else
                    return new ReturnObject()
                    {
                        Id = personId,
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
        public static ReturnObject UpdateDoctor(List<KeyValue> doctor)
        {
            try
            {

                var personId = doctor.FirstOrDefault(x => x.Key == "Id")?.Value;
                var hospitalId = doctor.FirstOrDefault(x => x.Key == "HospitalId")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Doctor_update]",
                    new List<SqlParameter>
                    {
                            new SqlParameter("@personId", personId),
                            new SqlParameter("@hospitalId", hospitalId),
                    });
                if (returnValue == 1)
                {
                    return new ReturnObject()
                    {
                        Id = personId,
                        State = "success",
                        Message = "record was successfully updated!"
                    };
                }
                else
                    return new ReturnObject()
                    {
                        Id = personId,
                        State = "error",
                        Message = "an error occured while updating this record!"
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
    }
}
