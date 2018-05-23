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
                var deceasedPersonId = Guid.NewGuid().ToString();
                deceased.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = deceasedPersonId
                });
                var deceasedPersonReturnObject = PersonService.InsertPerson(deceased);
                if(deceasedPersonReturnObject.State == "success")
                {
                    deceased.Add(new KeyValue()
                    {
                        Key = "PersonId",
                        Value = deceasedPersonId
                    });
                    var deceasedReturnObject = DeceasedService.InsertDeceased(deceased);
                    funeral.Add(new KeyValue()
                    {
                        Key = "DeceasedId",
                        Value = deceasedReturnObject.Id
                    });
                }
            }

            if (informant != null && informant.Count > 0)
            {
                var informantPersonId = Guid.NewGuid().ToString();
                informant.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = informantPersonId
                });
                var informantPersonReturnObject = PersonService.InsertPerson(informant);
                if(informantPersonReturnObject.State == "success")
                {
                    informant.Add(new KeyValue()
                    {
                        Key = "PersonId",
                        Value = informantPersonId
                    });
                    var informantReturnObject = InformantService.InsertInformant(informant);
                    funeral.Add(new KeyValue()
                    {
                        Key = "InformantId",
                        Value = informantReturnObject.Id
                    });
                }
            }

            if (nextOfKin != null && nextOfKin.Count > 0)
            {
                var nextOfKinPersonId = Guid.NewGuid().ToString();
                nextOfKin.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = nextOfKinPersonId
                });
                var nextOfKinPersonReturnObject = PersonService.InsertPerson(nextOfKin);
                if(nextOfKinPersonReturnObject.State == "success")
                {
                    nextOfKin.Add(new KeyValue()
                    {
                        Key = "PersonId",
                        Value = nextOfKinPersonId
                    });
                    var nextOfKinReturnObject = NextOfKinService.InsertNextOfKin(nextOfKin);
                    funeral.Add(new KeyValue()
                    {
                        Key = "NextOfKinId",
                        Value = nextOfKinReturnObject.Id
                    });
                }
            }

            if (doctor != null && doctor.Count > 0)
            {
                var doctorPersonId = Guid.NewGuid().ToString();
                doctor.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = doctorPersonId
                });
                var nextOfKinPersonReturnObject = PersonService.InsertPerson(doctor);
                if(nextOfKinPersonReturnObject.State == "success")
                {
                    doctor.Add(new KeyValue()
                    {
                        Key = "PersonId",
                        Value = doctorPersonId
                    });
                    var doctorReturnObject = DoctorService.InsertDoctor(doctor);
                    funeral.Add(new KeyValue()
                    {
                        Key = "DoctorId",
                        Value = doctorReturnObject.Id
                    });
                }
            }

            if (homeAffairsOfficer != null && homeAffairsOfficer.Count > 0)
            {
                var homeAffairsOfficerPersonId = Guid.NewGuid().ToString();
                homeAffairsOfficer.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = homeAffairsOfficerPersonId
                });
                var homeAffairsOfficerPersonReturnObject = PersonService.InsertPerson(homeAffairsOfficer);
                if(homeAffairsOfficerPersonReturnObject.State == "success")
                {
                    homeAffairsOfficer.Add(new KeyValue()
                    {
                        Key = "PersonId",
                        Value = Guid.NewGuid().ToString()
                    });
                    var homeAffairsOfficerReturnObject = HomeAffairsOfficerService.InsertHomeAffairesOfficer(homeAffairsOfficer);
                    funeral.Add(new KeyValue()
                    {
                        Key = "HomeAffairsOfficerId",
                        Value = homeAffairsOfficerReturnObject.Id
                    });
                }
            }

            if (funeral != null && funeral.Count > 0)
            {
                var funeralReturnObjectId = Guid.NewGuid().ToString();
                funeral.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = funeralReturnObjectId
                });
                var funeralNumber = SharedService.RandomString(8);
                funeral.Add(new KeyValue()
                {
                    Key = "FuneralNumber",
                    Value = funeralNumber
                });
                var funeralReturnObject = FuneralService.InsertFuneral(funeral);
                if(funeralReturnObject.State == "success")
                {
                    return Json(new { state = "success", funeralId = funeralReturnObject.Id }, JsonRequestBehavior.AllowGet);
                }
                return Json(new { state = "error", hospital = "" }, JsonRequestBehavior.AllowGet);
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
                    var informantPersonReturnObject = PersonService.UpdatePerson(informant);
                    if (informantPersonReturnObject.State == "success")
                    {
                        var informantReturnObject = InformantService.UpdateInformant(informant);
                    }
                }
                else
                {
                    var informantPersonId = Guid.NewGuid().ToString();
                    SharedService.AddAttributeToKeyValueObject(informant, "Id", informantPersonId);
                    var informantPersonReturnObject = PersonService.InsertPerson(informant);
                    if (informantPersonReturnObject.State == "success")
                    {
                        SharedService.AddAttributeToKeyValueObject(informant, "PersonId", informantPersonId);
                        var informantReturnObject = InformantService.InsertInformant(informant);
                        if (informantReturnObject.State == "success")
                        {
                            SharedService.UpdateAttributeToKeyValueObject(funeral, "InformantId", informantReturnObject.Id);
                        }
                    }
                }
               
            }

            if (nextOfKin != null && nextOfKin.Count > 0)
            {
                var existingNextOfKinCount = NextOfKinService.QueryCountOfNextOsKinssByFuneralId(funeralId);
                if (existingNextOfKinCount > 0)
                {
                    var nextOfKinPersonReturnObject = PersonService.UpdatePerson(nextOfKin);
                    if (nextOfKinPersonReturnObject.State == "success")
                    {
                        var nextOfKinReturnObject = NextOfKinService.UpdateNextOfKin(nextOfKin);
                    }
                }
                else
                {
                    var nextOfKinPersonId = Guid.NewGuid().ToString();
                    SharedService.AddAttributeToKeyValueObject(nextOfKin, "Id", nextOfKinPersonId);
                    var nextOfKinPersonReturnObject = PersonService.InsertPerson(nextOfKin);
                    if (nextOfKinPersonReturnObject.State == "success")
                    {
                        SharedService.AddAttributeToKeyValueObject(nextOfKin, "PersonId", nextOfKinPersonId);
                        var nextOfKinReturnObject = NextOfKinService.InsertNextOfKin(nextOfKin);
                        if (nextOfKinReturnObject.State == "success")
                        {
                            SharedService.UpdateAttributeToKeyValueObject(funeral, "NextOfKinId", nextOfKinReturnObject.Id);
                        }
                    }
                }
            }

            if (doctor != null && doctor.Count > 0)
            {
                var existingDoctorCount = DoctorService.QueryCountOfDoctorsByFuneralId(funeralId);
                if (existingDoctorCount > 0)
                {
                    var nextOfKinPersonReturnObject = PersonService.UpdatePerson(doctor);
                    if (nextOfKinPersonReturnObject.State == "success")
                    {
                        var doctorReturnObject = DoctorService.UpdateDoctor(doctor);
                    }
                }
                else
                {
                    var doctorPersonId = Guid.NewGuid().ToString();
                    SharedService.AddAttributeToKeyValueObject(doctor, "Id", doctorPersonId);
                    var nextOfKinPersonReturnObject = PersonService.InsertPerson(doctor);
                    if (nextOfKinPersonReturnObject.State == "success")
                    {
                        SharedService.AddAttributeToKeyValueObject(doctor, "PersonId", doctorPersonId);
                        var doctorReturnObject = DoctorService.InsertDoctor(doctor);
                        SharedService.UpdateAttributeToKeyValueObject(funeral, "DoctorId", doctorReturnObject.Id);
                    }
                }
            }

            if (homeAffairsOfficer != null && homeAffairsOfficer.Count > 0)
            {
                var existingHomeAffairsOfficerCount = HomeAffairsOfficerService.QueryCountOfHomeAffairsOfficersByFuneralId(funeralId);
                if(existingHomeAffairsOfficerCount > 0)
                {
                    var homeAffairsOfficerPersonReturnObject = PersonService.UpdatePerson(homeAffairsOfficer);
                }
                else
                {
                    var homeAffairsOfficerPersonId = Guid.NewGuid().ToString();
                    SharedService.AddAttributeToKeyValueObject(homeAffairsOfficer, "Id", homeAffairsOfficerPersonId);
                    var homeAffairsOfficerPersonReturnObject = PersonService.InsertPerson(homeAffairsOfficer);
                    if (homeAffairsOfficerPersonReturnObject.State == "success")
                    {
                        SharedService.AddAttributeToKeyValueObject(homeAffairsOfficer, "PersonId", Guid.NewGuid().ToString());
                        var homeAffairsOfficerReturnObject = HomeAffairsOfficerService.InsertHomeAffairesOfficer(homeAffairsOfficer);
                        if(homeAffairsOfficerReturnObject.State == "success")
                        {
                            SharedService.UpdateAttributeToKeyValueObject(funeral, "HomeAffairsOfficerId", homeAffairsOfficerReturnObject.Id);
                        }
                    }
                }
                
            }

            if (funeral != null && funeral.Count > 0)
            {
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