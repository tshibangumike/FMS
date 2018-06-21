using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace fms.Web.components.homeaffairsofficer
{
    public class HomeAffairsOfficerController : BaseController
    {
        public ActionResult GetHomeAffairsOfficerByFuneralId(Guid funeralId)
        {
            var record = HomeAffairsOfficerService.QueryHomeAffairsOfficerByFuneralId(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetActiveHomeAffairsOfficers(int pageNumber, int listType)
        {
            var records = HomeAffairsOfficerService.QueryActiveHomeAffairsOfficers(pageNumber, listType);
            return Json(records, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetHomeAffairsOfficerById(Guid homeAffairsOfficerId)
        {
            var record = HomeAffairsOfficerService.QueryHomeAffairsOfficerById(homeAffairsOfficerId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddHomeAffairsOfficer(List<KeyValue> homeAffairsOfficer)
        {
            try
            {
                var homeAffairsOfficerPersonId = Guid.NewGuid().ToString();
                KeyValueService.AddAttribute(homeAffairsOfficer, "Id", homeAffairsOfficerPersonId);
                GenericModelService.AddAuditAttributeForCreateEvent(homeAffairsOfficer, GetCurrentUserId());
                var homeAffairsOfficerPersonReturnObject = PersonService.InsertPerson(homeAffairsOfficer);
                if (homeAffairsOfficerPersonReturnObject.State != "success")
                    return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
                KeyValueService.AddAttribute(homeAffairsOfficer, "PersonId",
                    homeAffairsOfficerPersonReturnObject.Id);
                var homeAffairsOfficerReturnObject =
                    HomeAffairsOfficerService.InsertHomeAffairesOfficer(homeAffairsOfficer);
                if (homeAffairsOfficerReturnObject.State != "success")
                    return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
                var newHomeAffairsOfficer =
                    HomeAffairsOfficerService.QueryHomeAffairsOfficerById(
                        Guid.Parse(homeAffairsOfficerReturnObject.Id));
                return Json(new {state = "success", homeAffairsOfficer = newHomeAffairsOfficer},
                    JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new {state = "error", message = ex.Message}, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UpdateHomeAffairsOfficer(List<KeyValue> homeAffairsOfficer)
        {
            if (homeAffairsOfficer == null || homeAffairsOfficer.Count <= 0)
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            KeyValueService.AddAttribute(homeAffairsOfficer, "ModifiedById", GetCurrentUserId());
            var personReturnObject = PersonService.UpdatePerson(homeAffairsOfficer);
            return personReturnObject.State == "success"
                ? Json(new {state = "success", homeAffairsOfficerId = personReturnObject.Id},
                    JsonRequestBehavior.AllowGet)
                : Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
        }
    }
}