using fms.Model;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fms.Web.assets.funeral
{
    public class FuneralController : BaseController
    {
        
        public ActionResult CreateFuneral(Person deceased, Funeral funeral)
        {
            unitOfWork.PersonRepository.Insert(deceased);
            unitOfWork.FuneralRepository.Insert(funeral);
            return View();
        }
    }
}