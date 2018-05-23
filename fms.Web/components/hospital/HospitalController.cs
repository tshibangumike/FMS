using fms.Model;
using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace fms.Web.components.hospital
{
    public class HospitalController : BaseController
    {
        public ActionResult GetActiveHospitals()
        {
            try
            {
                var records = HospitalService.QueryActiveHospitals();
                return Json(records, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetHospitalById(Guid hospitalId)
        {
            try
            {
                var record = HospitalService.QueryHospitalById(hospitalId);
                return Json(record, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetHospitalsByName(string searchText)
        {
            try
            {
                var records = HospitalService.QueryHospitalsByName(searchText);
                return Json(records, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult AddHospital(List<KeyValue> hospital)
        {
            try
            {
                hospital.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = Guid.NewGuid().ToString()
                });
                var returnObject = HospitalService.InsertHospital(hospital);
                if (returnObject.State == "success")
                {
                    var newHospital = HospitalService.QueryHospitalById(Guid.Parse(returnObject.Id));
                    return Json(new { state = "success", hospital = newHospital }, JsonRequestBehavior.AllowGet);
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