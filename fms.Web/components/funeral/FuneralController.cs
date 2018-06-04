using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace fms.Web.assets.funeral
{
    public class FuneralController : BaseController
    {
        public ActionResult GetActiveFunerals()
        {
            var records = FuneralService.QueryActiveFunerals();
            return Json(records, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetFuneralById(Guid funeralId)
        {
            var record = FuneralService.QueryFuneralById(funeralId);
            return Json(record, JsonRequestBehavior.AllowGet);
        }
        public ActionResult CreateFuneral(List<KeyValue> deceased, List<KeyValue> informant, List<KeyValue> nextOfKin, List<KeyValue> doctor, List<KeyValue> homeAffairsOfficer, List<KeyValue> funeral)
        {

            if(funeral == null)
            {
                funeral = new List<KeyValue>();
            }

            if (deceased != null && deceased.Count > 0)
            {
                var deceasedAddress = KeyValueService.GetAttributeValue(deceased, "FullAddress");
                if (deceasedAddress != null)
                {
                    var address = new List<KeyValue>();
                    KeyValueService.AddAttribute(address, "Id", Guid.NewGuid().ToString());
                    KeyValueService.AddAttribute(address, "FullAddress", deceasedAddress);
                    var addressReturnObject = AddressService.InsertAddress(address);
                    if(addressReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(deceased, "AddressId", addressReturnObject.Id);
                    }
                }
                var deceasedPersonId = Guid.NewGuid().ToString();
                KeyValueService.AddAttribute(deceased, "Id", deceasedPersonId);
                GenericModelService.AddAuditAttributeForCreateEvent(deceased, GetCurrentUserId());
                var deceasedPersonReturnObject = PersonService.InsertPerson(deceased);
                if(deceasedPersonReturnObject.State == "success")
                {
                    KeyValueService.AddAttribute(deceased, "PersonId", deceasedPersonId);
                    var deceasedReturnObject = DeceasedService.InsertDeceased(deceased);
                    if(deceasedReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(funeral, "DeceasedId", deceasedReturnObject.Id);                        
                    }
                }
            }

            if (informant != null && informant.Count > 0)
            {
                var informantPersonId = Guid.NewGuid().ToString();
                KeyValueService.AddAttribute(informant, "Id", informantPersonId);
                GenericModelService.AddAuditAttributeForCreateEvent(informant, GetCurrentUserId());
                var informantPersonReturnObject = PersonService.InsertPerson(informant);
                if(informantPersonReturnObject.State == "success")
                {
                    KeyValueService.AddAttribute(informant, "PersonId", informantPersonId);
                    var informantReturnObject = InformantService.InsertInformant(informant);
                    if(informantReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(funeral, "InformantId", informantReturnObject.Id);
                    }
                }
            }

            if (nextOfKin != null && nextOfKin.Count > 0)
            {
                var nextOfKinPersonId = Guid.NewGuid().ToString();
                KeyValueService.AddAttribute(nextOfKin, "Id", nextOfKinPersonId);
                GenericModelService.AddAuditAttributeForCreateEvent(nextOfKin, GetCurrentUserId());
                var nextOfKinPersonReturnObject = PersonService.InsertPerson(nextOfKin);
                if(nextOfKinPersonReturnObject.State == "success")
                {
                    KeyValueService.AddAttribute(nextOfKin, "PersonId", nextOfKinPersonId);
                    var nextOfKinReturnObject = NextOfKinService.InsertNextOfKin(nextOfKin);
                    if (nextOfKinReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(funeral, "NextOfKinId", nextOfKinReturnObject.Id);
                    }
                }
            }

            if (doctor != null && doctor.Count > 0)
            {
                if(KeyValueService.AttributeContainsValue(doctor, "Id"))
                {
                    var doctorPersonId = KeyValueService.GetAttributeValue(doctor, "Id");
                    KeyValueService.AddAttribute(funeral, "DoctorId", doctorPersonId);
                }
                else
                {
                    var doctorPersonId = Guid.NewGuid().ToString();
                    KeyValueService.AddAttribute(doctor, "Id", doctorPersonId);
                    GenericModelService.AddAuditAttributeForCreateEvent(doctor, GetCurrentUserId());
                    var nextOfKinPersonReturnObject = PersonService.InsertPerson(doctor);
                    if (nextOfKinPersonReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(doctor, "PersonId", doctorPersonId);
                        var doctorReturnObject = DoctorService.InsertDoctor(doctor);
                        if (doctorReturnObject.State == "success")
                        {
                            KeyValueService.AddAttribute(funeral, "DoctorId", doctorReturnObject.Id);
                        }
                    }
                }
            }

            if (homeAffairsOfficer != null && homeAffairsOfficer.Count > 0)
            {
                if(KeyValueService.AttributeContainsValue(homeAffairsOfficer, "Id"))
                {
                    var homeAffairsOfficerPersonId = KeyValueService.GetAttributeValue(homeAffairsOfficer, "Id");
                    KeyValueService.AddAttribute(funeral, "HomeAffairsOfficerId", homeAffairsOfficerPersonId);
                }
                else
                {
                    var homeAffairsOfficerPersonId = Guid.NewGuid().ToString();
                    KeyValueService.AddAttribute(homeAffairsOfficer, "Id", homeAffairsOfficerPersonId);
                    GenericModelService.AddAuditAttributeForCreateEvent(homeAffairsOfficer, GetCurrentUserId());
                    var homeAffairsOfficerPersonReturnObject = PersonService.InsertPerson(homeAffairsOfficer);
                    if (homeAffairsOfficerPersonReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(homeAffairsOfficer, "PersonId", homeAffairsOfficerPersonReturnObject.Id);
                        var homeAffairsOfficerReturnObject = HomeAffairsOfficerService.InsertHomeAffairesOfficer(homeAffairsOfficer);
                        if (homeAffairsOfficerReturnObject.State == "success")
                        {
                            KeyValueService.AddAttribute(funeral, "HomeAffairsOfficerId", homeAffairsOfficerReturnObject.Id);
                        }
                    }
                }
            }

            if (funeral != null && funeral.Count > 0)
            {
                var funeralId = Guid.NewGuid().ToString();
                KeyValueService.AddAttribute(funeral, "Id", funeralId);
                var funeralNumber = SharedService.RandomString(8);
                KeyValueService.AddAttribute(funeral, "FuneralNumber", funeralNumber);
                GenericModelService.AddAuditAttributeForCreateEvent(funeral, GetCurrentUserId());
                var funeralReturnObject = FuneralService.InsertFuneral(funeral);
                if(funeralReturnObject.State == "success")
                {
                    return Json(new { state = "success", funeralId = funeralReturnObject.Id }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { state = "error", message = "" }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { state = "error", message = "" }, JsonRequestBehavior.AllowGet);

        }
        public ActionResult UpdateFuneral(List<KeyValue> deceased, List<KeyValue> informant, List<KeyValue> nextOfKin, List<KeyValue> doctor, List<KeyValue> homeAffairsOfficer, List<KeyValue> funeral)
        {
            var funeralId = Guid.Empty;
            if (funeral == null)
            {
                funeral = new List<KeyValue>();
            }
            else
            {
                funeralId = Guid.Parse(funeral.FirstOrDefault(x => x.Key == "Id")?.Value);
            }

            if (deceased != null && deceased.Count > 0)
            {
                KeyValueService.AddAttribute(deceased, "ModifiedById", GetCurrentUserId());
                var deceasedPersonReturnObject = PersonService.UpdatePerson(deceased);
                if (deceasedPersonReturnObject.State == "success")
                {
                    var deceasedReturnObject = DeceasedService.UpdateDeceased(deceased);
                }
            }

            if (informant != null && informant.Count > 0)
            {
                var existingInformantCount = InformantService.QueryCountOfInformantsByFuneralId(funeralId);
                if(existingInformantCount > 0)
                {
                    KeyValueService.AddAttribute(informant, "ModifiedById", GetCurrentUserId());
                    var informantPersonReturnObject = PersonService.UpdatePerson(informant);
                    if (informantPersonReturnObject.State == "success")
                    {
                        var informantReturnObject = InformantService.UpdateInformant(informant);
                    }
                }
                else
                {
                    var informantPersonId = Guid.NewGuid().ToString();
                    KeyValueService.AddAttribute(informant, "Id", informantPersonId);
                    GenericModelService.AddAuditAttributeForCreateEvent(informant, GetCurrentUserId());
                    var informantPersonReturnObject = PersonService.InsertPerson(informant);
                    if (informantPersonReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(informant, "PersonId", informantPersonId);
                        var informantReturnObject = InformantService.InsertInformant(informant);
                        if (informantReturnObject.State == "success")
                        {
                            KeyValueService.SetOrAddAttribute(funeral, "InformantId", informantReturnObject.Id);
                        }
                    }
                }
               
            }

            if (nextOfKin != null && nextOfKin.Count > 0)
            {
                var existingNextOfKinCount = NextOfKinService.QueryCountOfNextOsKinssByFuneralId(funeralId);
                if (existingNextOfKinCount > 0)
                {
                    KeyValueService.AddAttribute(nextOfKin, "ModifiedById", GetCurrentUserId());
                    var nextOfKinPersonReturnObject = PersonService.UpdatePerson(nextOfKin);
                    if (nextOfKinPersonReturnObject.State == "success")
                    {
                        var nextOfKinReturnObject = NextOfKinService.UpdateNextOfKin(nextOfKin);
                    }
                }
                else
                {
                    var nextOfKinPersonId = Guid.NewGuid().ToString();
                    KeyValueService.AddAttribute(nextOfKin, "Id", nextOfKinPersonId);
                    GenericModelService.AddAuditAttributeForCreateEvent(nextOfKin, GetCurrentUserId());
                    var nextOfKinPersonReturnObject = PersonService.InsertPerson(nextOfKin);
                    if (nextOfKinPersonReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(nextOfKin, "PersonId", nextOfKinPersonId);
                        var nextOfKinReturnObject = NextOfKinService.InsertNextOfKin(nextOfKin);
                        if (nextOfKinReturnObject.State == "success")
                        {
                            KeyValueService.SetOrAddAttribute(funeral, "NextOfKinId", nextOfKinReturnObject.Id);
                        }
                    }
                }
            }

            if (doctor != null && doctor.Count > 0)
            {
                var existingDoctorCount = DoctorService.QueryCountOfDoctorsByFuneralId(funeralId);
                if (existingDoctorCount > 0)
                {
                    KeyValueService.AddAttribute(doctor, "ModifiedById", GetCurrentUserId());
                    var nextOfKinPersonReturnObject = PersonService.UpdatePerson(doctor);
                    if (nextOfKinPersonReturnObject.State == "success")
                    {
                        var doctorReturnObject = DoctorService.UpdateDoctor(doctor);
                    }
                }
                else
                {
                    var doctorPersonId = Guid.NewGuid().ToString();
                    KeyValueService.AddAttribute(doctor, "Id", doctorPersonId);
                    GenericModelService.AddAuditAttributeForCreateEvent(doctor, GetCurrentUserId());
                    var nextOfKinPersonReturnObject = PersonService.InsertPerson(doctor);
                    if (nextOfKinPersonReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(doctor, "PersonId", doctorPersonId);
                        var doctorReturnObject = DoctorService.InsertDoctor(doctor);
                        KeyValueService.SetOrAddAttribute(funeral, "DoctorId", doctorReturnObject.Id);
                    }
                }
            }

            if (homeAffairsOfficer != null && homeAffairsOfficer.Count > 0)
            {
                var existingHomeAffairsOfficerCount = HomeAffairsOfficerService.QueryCountOfHomeAffairsOfficersByFuneralId(funeralId);
                if(existingHomeAffairsOfficerCount > 0)
                {
                    KeyValueService.AddAttribute(homeAffairsOfficer, "ModifiedById", GetCurrentUserId());
                    var homeAffairsOfficerPersonReturnObject = PersonService.UpdatePerson(homeAffairsOfficer);
                }
                else
                {
                    var homeAffairsOfficerPersonId = Guid.NewGuid().ToString();
                    KeyValueService.AddAttribute(homeAffairsOfficer, "Id", homeAffairsOfficerPersonId);
                    GenericModelService.AddAuditAttributeForCreateEvent(homeAffairsOfficer, GetCurrentUserId());
                    var homeAffairsOfficerPersonReturnObject = PersonService.InsertPerson(homeAffairsOfficer);
                    if (homeAffairsOfficerPersonReturnObject.State == "success")
                    {
                        KeyValueService.AddAttribute(homeAffairsOfficer, "PersonId", Guid.NewGuid().ToString());
                        var homeAffairsOfficerReturnObject = HomeAffairsOfficerService.InsertHomeAffairesOfficer(homeAffairsOfficer);
                        if(homeAffairsOfficerReturnObject.State == "success")
                        {
                            KeyValueService.SetOrAddAttribute(funeral, "HomeAffairsOfficerId", homeAffairsOfficerReturnObject.Id);
                        }
                    }
                }
                
            }

            if (funeral != null && funeral.Count > 0)
            {
                KeyValueService.AddAttribute(funeral, "ModifiedById", GetCurrentUserId());
                var funeralReturnObject = FuneralService.UpdateFuneral(funeral);
                if (funeralReturnObject.State == "success")
                {
                    return Json(new { state = "success", funeralId = funeralReturnObject.Id }, JsonRequestBehavior.AllowGet);
                }
            }

            return Json("error", JsonRequestBehavior.AllowGet);
        }
    }
}