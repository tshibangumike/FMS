using System;
using System.Collections.Generic;
using System.Web.Mvc;
using fms.Service;
using fms.Web.components._base;

namespace fms.Web.components.member
{
    public class MemberController : BaseController
    {
        public ActionResult GetActiveMembers()
        {
            var records = MemberService.QueryActiveMembers();
            return Json(records, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetMemberById(Guid memberId)
        {
            var record = MemberService.QueryMemberById(memberId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddMember(List<KeyValue> member)
        {
            try
            {
                if (member == null || member.Count <= 0)
                    return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
                var memberPersonId = Guid.NewGuid().ToString();
                KeyValueService.AddAttribute(member, "Id", memberPersonId);
                GenericModelService.AddAuditAttributeForCreateEvent(member, GetCurrentUserId());
                var personReturnObject = PersonService.InsertPerson(member);
                if (personReturnObject.State != "success")
                    return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
                var memberNumber = SharedService.RandomString(8);
                KeyValueService.AddAttribute(member, "MemberNumber", memberNumber);
                KeyValueService.AddAttribute(member, "PersonId", memberPersonId);
                var memberReturnObject = MemberService.InsertMember(member);
                if (memberReturnObject.State == "success")
                {
                    return Json(new {state = "success", memberId = memberReturnObject.Id},
                        JsonRequestBehavior.AllowGet);
                }

                return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new {state = "error", message = ex.Message}, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UpdateInformant(List<KeyValue> member)
        {
            if (member == null || member.Count <= 0)
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            KeyValueService.AddAttribute(member, "ModifiedById", GetCurrentUserId());
            var personReturnObject = PersonService.UpdatePerson(member);
            return Json(
                personReturnObject.State != "success"
                    ? new {state = "success", message = ""}
                    : new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
        }
    }
}