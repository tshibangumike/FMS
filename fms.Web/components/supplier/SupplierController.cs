using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace fms.Web.components.supplier
{
    public class SupplierController : BaseController
    {
        public ActionResult GetActiveSuppliers(int pageNumber, int listType)
        {
            var records = SupplierService.QueryActiveSuppliers(pageNumber, listType);
            return Json(records, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddSupplier(List<KeyValue> supplier)
        {
            try
            {
                var supplierId = Guid.NewGuid().ToString();
                KeyValueService.AddAttribute(supplier, "Id", supplierId);
                var supplierReturnObject = SupplierService.InsertSupplier(supplier);
                return supplierReturnObject.State == "success" ? Json(new { state = "success", supplierId = supplierReturnObject.Id }, JsonRequestBehavior.AllowGet) : Json(new { state = "error", hospital = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
    }
}