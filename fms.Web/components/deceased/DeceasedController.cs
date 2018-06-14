using System;
using System.Collections.Generic;
using System.Web.Mvc;
using fms.Service;
using fms.Web.components._base;

namespace fms.Web.components.deceased
{
    public class DeceasedController : BaseController
    {
        public ActionResult GetDeceasedByFuneralId(Guid funeralId)
        {
            var record = DeceasedService.QueryDeceasedByFuneralId(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDeceasedById(Guid deceasedId)
        {
            var record = DeceasedService.QueryDeceasedById(deceasedId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetActiveDeceaseds()
        {
            var record = DeceasedService.QueryActiveDeceaseds();
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateDeceased(List<KeyValue> deceased)
        {
            if (deceased == null || deceased.Count <= 0)
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            KeyValueService.AddAttribute(deceased, "ModifiedById", GetCurrentUserId());
            var deceasedPersonReturnObject = PersonService.UpdatePerson(deceased);
            if (deceasedPersonReturnObject.State != "success")
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            var deceasedReturnObject = DeceasedService.UpdateDeceased(deceased);
            return deceasedReturnObject.State == "success"
                ? Json(new {state = "success", deceasedId = deceasedReturnObject.Id}, JsonRequestBehavior.AllowGet)
                : Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
        }
    }
}