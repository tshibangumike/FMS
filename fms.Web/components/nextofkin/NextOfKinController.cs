using fms.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fms.Web.components.nextofkin
{
    public class NextOfKinController : Controller
    {
        public ActionResult GetNextOfKinByFuneralId(Guid funeralId)
        {
            var record = NextOfKinService.QueryNextOfKinByFuneralId(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetActiveNextOfKins()
        {
            var record = NextOfKinService.QueryActiveNextOfKins();
            return Json(record, JsonRequestBehavior.AllowGet);
        }
    }
}