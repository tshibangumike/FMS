using fms.Service;
using fms.Web.components._base;
using System;
using System.Collections.Generic;
using System.IO;
using System.Web;
using System.Web.Mvc;

namespace fms.Web.components.funeraldocument
{
    public class FuneralDocumentController : BaseController
    {
        public ActionResult GetFuneralDocumentsByFuneralId(Guid funeralId)
        {
            var records = FuneralDocumentService.QueryFuneralDocumentsByFuneralId(funeralId);
            return Json(records, JsonRequestBehavior.AllowGet);
        }
        public ActionResult AddFuneralDocument(HttpPostedFileBase document, int documentTypeId, string description, string funeralId)
        {
            var funeralDocument = new List<KeyValue>();
            KeyValueService.AddAttribute(funeralDocument, "Id", Guid.NewGuid().ToString());
            KeyValueService.AddAttribute(funeralDocument, "Name", document.FileName);
            KeyValueService.AddAttribute(funeralDocument, "DocumentTypeId", documentTypeId.ToString());
            KeyValueService.AddAttribute(funeralDocument, "Description", description);
            KeyValueService.AddAttribute(funeralDocument, "FuneralId", funeralId);
            var stream = document.InputStream;
            var binaryReader = new BinaryReader(stream);
            var bytes = binaryReader.ReadBytes((Int32)stream.Length);
            var funeralDocumentReturnObject = FuneralDocumentService.InsertFuneralDocument(funeralDocument, bytes);
            if(funeralDocumentReturnObject.State == "success")
            {
                return Json(new { state = "success", funeralDocumentId = funeralDocumentReturnObject.Id }, JsonRequestBehavior.AllowGet);
            }
            return Json("", JsonRequestBehavior.AllowGet);
        }
    }
}