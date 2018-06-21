using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using fms.Service;
using fms.Web.components._base;

namespace fms.Web.components.homeaffairsoffice
{
    public class HomeAffairsOfficeController : BaseController
    {

        public ActionResult GetActiveHomeAffairsOffices(int pageNumber, int listType)
        {
            var records = HomeAffairsOfficeService.QueryActiveHomeAffairsOffices(pageNumber, listType);
            return Json(records, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetHomeAffairsOfficeById(Guid homeAffairsOfficeId)
        {
            var record = HomeAffairsOfficeService.QueryHomeAffairsOfficeById(homeAffairsOfficeId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddHomeAffairsOffice(List<KeyValue> homeAffairsOffice)
        {
            try
            {
                var homeAffairsOfficeId = Guid.NewGuid().ToString();
                homeAffairsOffice.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = homeAffairsOfficeId
                });
                var returnObject = HomeAffairsOfficeService.InsertHomeAffairsOffice(homeAffairsOffice);
                return returnObject.State == "success"
                    ? Json(new {state = "success", homeAffairsOfficeId = homeAffairsOfficeId},
                        JsonRequestBehavior.AllowGet)
                    : Json(new {state = "error", hospital = ""}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
    }
}