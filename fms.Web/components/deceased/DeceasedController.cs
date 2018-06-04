using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fms.Web.components
{
    public class DeceasedController : BaseController
    {
        public ActionResult GetDeceasedByFuneralId(Guid funeralId)
        {
            var record = DeceasedService.QueryDeceasedByFuneralId(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetActiveDeceaseds()
        {
            var record = DeceasedService.QueryActiveDeceaseds();
            return Json(record, JsonRequestBehavior.AllowGet);
        }
    }
}