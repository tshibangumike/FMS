using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fms.Web.components.informant
{
    public class InformantController : BaseController
    {
        public ActionResult GetInformantByFuneralId(Guid funeralId)
        {
            var record = InformantService.QueryInformantByFuneralId(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }
    }
}