using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fms.Web.components.doctor
{
    public class DoctorController : BaseController
    {
        public ActionResult GetDoctorByFuneralId(Guid funeralId)
        {
            var record = DoctorService.QueryDoctorByFuneralId(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }
    }
}