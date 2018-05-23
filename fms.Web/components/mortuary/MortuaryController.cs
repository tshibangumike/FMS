﻿using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace fms.Web.components.mortuary
{
    public class MortuaryController : BaseController
    {
        public ActionResult GetActiveMortuaries()
        {
            try
            {
                var records = MortuaryService.QueryActiveMortuaries();
                return Json(records, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetMortuaryById(Guid mortuaryId)
        {
            try
            {
                var record = MortuaryService.QueryMortuaryById(mortuaryId);
                return Json(record, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult GetMortuarysByName(string searchText)
        {
            try
            {
                var records = MortuaryService.QueryMortuariesByName(searchText);
                return Json(records, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message, JsonRequestBehavior.AllowGet);
            }
        }
        public ActionResult AddMortuary(List<KeyValue> mortuary)
        {
            try
            {
                mortuary.Add(new KeyValue()
                {
                    Key = "Id",
                    Value = Guid.NewGuid().ToString()
                });
                var returnObject = MortuaryService.InsertMortuary(mortuary);
                if (returnObject.State == "success")
                {
                    var newMortuary = MortuaryService.QueryMortuaryById(Guid.Parse(returnObject.Id));
                    return Json(new { state = "success", mortuary = newMortuary }, JsonRequestBehavior.AllowGet);
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