using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace fms.Web.components.informant
{
    public class InformantController : BaseController
    {
        public ActionResult GetActiveInformants(int pageNumber, int listType)
        {
            var record = InformantService.QueryActiveInformants(pageNumber, listType);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetInformantByFuneralId(Guid funeralId)
        {
            var record = InformantService.QueryInformantByFuneralId(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetInformantById(Guid informantId)
        {
            var record = InformantService.QueryInformantById(informantId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UpdateInformant(List<KeyValue> informant)
        {
            if (informant == null || informant.Count <= 0)
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            KeyValueService.AddAttribute(informant, "ModifiedById", GetCurrentUserId());
            var informantPersonReturnObject = PersonService.UpdatePerson(informant);
            if (informantPersonReturnObject.State != "success")
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            var informantReturnObject = InformantService.UpdateInformant(informant);
            return informantReturnObject.State == "success"
                ? Json(new {state = "success", informantId = informantReturnObject.Id}, JsonRequestBehavior.AllowGet)
                : Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
        }
    }
}