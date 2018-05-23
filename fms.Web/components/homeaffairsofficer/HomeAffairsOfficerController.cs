using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
    }
}