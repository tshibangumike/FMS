using fms.Service;
using System;
using System.Collections.Generic;
using System.Web.Mvc;
using fms.Web.components._base;

namespace fms.Web.components.nextofkin
{
    public class NextOfKinController : BaseController
    {
        public ActionResult GetNextOfKinByFuneralId(Guid funeralId)
        {
            var record = NextOfKinService.QueryNextOfKinByFuneralId(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetNextOfKinById(Guid nextOfKinId)
        {
            var record = NextOfKinService.QueryNextOfKinById(nextOfKinId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetActiveNextOfKins(int pageNumber, int listType)
        {
            var record = NextOfKinService.QueryActiveNextOfKins(pageNumber, listType);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateNextOfKin(List<KeyValue> nextOfKin)
        {
            if (nextOfKin == null || nextOfKin.Count <= 0)
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            KeyValueService.AddAttribute(nextOfKin, "ModifiedById", GetCurrentUserId());
            var personReturnObject = PersonService.UpdatePerson(nextOfKin);
            if (personReturnObject.State != "success")
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            var returnObject = InformantService.UpdateInformant(nextOfKin);
            return returnObject.State == "success"
                ? Json(new {state = "success", nextOfKinId = returnObject.Id}, JsonRequestBehavior.AllowGet)
                : Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeactivateNextOfKin(Guid nextOfKinId)
        {
            var returnObject = NextOfKinService.DeactivateNextOfKin(nextOfKinId);
            return returnObject.State == "success"
                ? Json(new { state = "success", nextOfKinId = returnObject.Id }, JsonRequestBehavior.AllowGet)
                : Json(new { state = "success", message = "" }, JsonRequestBehavior.AllowGet);
        }
    }
}