using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fms.Web.components.funeralboughtitem
{
    public class FuneralBoughtItemController : BaseController
    {
        public ActionResult GetFuneralBoughtItemsByFuneralId(Guid funeralId)
        {
            var records = FuneralBoughtItemService.QueryFuneralBoughtItemsByFuneralId(funeralId);
            return Json(records, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddFuneralBoughtItem(List<KeyValue> funeralBoughtItem)
        {
            try
            {
                funeralBoughtItem.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = Guid.NewGuid().ToString()
                });
                var returnObject = FuneralBoughtItemService.InsertFuneralBoughtItem(funeralBoughtItem);
                if (returnObject.State == "success")
                {
                    var newFuneralBoughtItem = HospitalService.QueryHospitalById(Guid.Parse(returnObject.Id));
                    return Json(new { state = "success", funeralBoughtItem = newFuneralBoughtItem }, JsonRequestBehavior.AllowGet);
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