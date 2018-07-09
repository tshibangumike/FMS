using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Web.Mvc;

namespace fms.Web.components.doctor
{
    public class DoctorController : BaseController
    {
        public ActionResult GetActiveDoctors(int pageNumber, int listType)
        {
            var records = DoctorService.QueryActiveDoctors(pageNumber, listType);
            return Json(records, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDoctorById(Guid doctorId)
        {
            var record = DoctorService.QueryDoctorById(doctorId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetDoctorByFuneralId(Guid funeralId)
        {
            var record = DoctorService.QueryDoctorByFuneralId(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddDoctor(List<KeyValue> doctor)
        {
            try
            {
                if (doctor == null || doctor.Count <= 0)
                    return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
                var doctorPersonId = Guid.NewGuid().ToString();
                KeyValueService.AddAttribute(doctor, "Id", doctorPersonId);
                GenericModelService.AddAuditAttributeForCreateEvent(doctor, GetCurrentUserId());
                var nextOfKinPersonReturnObject = PersonService.InsertPerson(doctor);
                if (nextOfKinPersonReturnObject.State != "success")
                    return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
                KeyValueService.AddAttribute(doctor, "PersonId", doctorPersonId);
                var doctorReturnObject = DoctorService.InsertDoctor(doctor);
                if (doctorReturnObject.State == "success")
                {
                    return Json(new {state = "success", doctorId = doctorReturnObject.Id},
                        JsonRequestBehavior.AllowGet);
                }

                return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new {state = "error", message = ex.Message}, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UpdateDoctor(List<KeyValue> doctor)
        {
            if (doctor == null || doctor.Count <= 0)
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            KeyValueService.AddAttribute(doctor, "ModifiedById", GetCurrentUserId());
            var doctorPersonReturnObject = PersonService.UpdatePerson(doctor);
            if (doctorPersonReturnObject.State != "success")
                return Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
            var doctorReturnObject = DoctorService.UpdateDoctor(doctor);
            return doctorReturnObject.State == "success"
                ? Json(new {state = "success", doctorId = doctorReturnObject.Id}, JsonRequestBehavior.AllowGet)
                : Json(new {state = "success", message = ""}, JsonRequestBehavior.AllowGet);
        }

        public ActionResult DeactivateDoctor(Guid doctorId)
        {
            var returnObject = InformantService.DeactivateInformant(doctorId);
            return returnObject.State == "success"
                ? Json(new { state = "success", informantId = returnObject.Id }, JsonRequestBehavior.AllowGet)
                : Json(new { state = "success", message = "" }, JsonRequestBehavior.AllowGet);
        }
    }
}