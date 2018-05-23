using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace fms.Web.components.cemetery
{
    public class CemeteryController : BaseController
    {
        public ActionResult GetActiveCemeteries()
        {
            try
            {
                var records = CemeteryService.QueryActiveCemeteries();
                return Json(records, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetCemeteryById(Guid cemeteryId)
        {
            try
            {
                var record = CemeteryService.QueryCemeteryById(cemeteryId);
                return Json(record, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetCemeteriesByName(string searchText)
        {
            try
            {
                var records = CemeteryService.QueryCemeteriesByName(searchText);
                return Json(records, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult AddCemetery(List<KeyValue> cemetery)
        {
            try
            {
                cemetery.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = Guid.NewGuid().ToString()
                });
                var returnObject = CemeteryService.InsertCemetery(cemetery);
                if (returnObject.State == "success")
                {
                    var newMortuary = CemeteryService.QueryCemeteryById(Guid.Parse(returnObject.Id));
                    return Json(new { state = "success", cemetery = newMortuary }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { state = "error", hospital = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
    }
}