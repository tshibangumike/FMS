﻿using fms.Model;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;

namespace fms.Service
{
    public class MemberService
    {
        public static List<Dictionary<string, object>> QueryActiveMembers(int pageNumber, int listType)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Member_queryactivemembers]",
                new List<SqlParameter>
                {
                    new SqlParameter("@pagenumber", pageNumber),
                    new SqlParameter("@listtype", listType),
                });
            return records;
        }

        public static Dictionary<string, object> QueryMemberById(Guid memberId)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure("[bbu].[Member_querymemberbyid]",
                new List<SqlParameter> {new SqlParameter("@id", memberId) });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static ReturnObject InsertMember(List<KeyValue> member)
        {
            try
            {

                var personId = member.FirstOrDefault(x => x.Key == "PersonId")?.Value;
                var memberNumber = member.FirstOrDefault(x => x.Key == "MemberNumber")?.Value;

                var returnValue = SharedService.ExecutePostSqlStoredProcedure("[bbu].[Member_create]",
                    new List<SqlParameter>
                    {
                        new SqlParameter("@personId", personId),
                        new SqlParameter("@memberNumber", memberNumber),
                        new SqlParameter("@stateId", 1)
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
    }
}
