using fms.Model;
using fms.Service;
using fms.Web.components._base;
using System;
using System.Web.Mvc;

namespace fms.Web.components.hospital
{
    public class HospitalController : BaseController
    {
        public ActionResult GetHospitals()
        {
            try
            {
                var records = HospitalService.QueryHospitals();
                return Json(records, JsonRequestBehavior.AllowGet);
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
        public ActionResult AddHospital(Hospital hospital)
        {
            try
            {
                hospital.Id = Guid.NewGuid();
                var returnObject = HospitalService.InsertHospital(hospital);
                if (returnObject.State == "success")
                {
                    var newHospital = HospitalService.QueryHospitalsById(Guid.Parse(returnObject.Id));
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