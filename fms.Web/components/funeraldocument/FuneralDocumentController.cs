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

        public ActionResult AddFuneralDocument(HttpPostedFileBase document, int documentTypeId, string description,
            string funeralId)
        {
            var funeralDocument = new List<KeyValue>();
            KeyValueService.AddAttribute(funeralDocument, "Id", Guid.NewGuid().ToString());
            KeyValueService.AddAttribute(funeralDocument, "Name", document.FileName);
            KeyValueService.AddAttribute(funeralDocument, "FileName", document.FileName);
            KeyValueService.AddAttribute(funeralDocument, "MimeType", document.ContentType);
            KeyValueService.AddAttribute(funeralDocument, "Size", document.ContentLength.ToString());
            KeyValueService.AddAttribute(funeralDocument, "DocumentTypeId", documentTypeId.ToString());
            KeyValueService.AddAttribute(funeralDocument, "Description", description);
            KeyValueService.AddAttribute(funeralDocument, "FuneralId", funeralId);
            var stream = document.InputStream;
            var binaryReader = new BinaryReader(stream);
            var bytes = binaryReader.ReadBytes((int) stream.Length);

            GenericModelService.AddAuditAttributeForCreateEvent(funeralDocument, GetCurrentUserId());

            DocumentService.InsertDocument(funeralDocument, bytes);

            var funeralDocumentReturnObject = FuneralDocumentService.InsertFuneralDocument(funeralDocument, bytes);
            return funeralDocumentReturnObject.State == "success"
                ? Json(new {state = "success", funeralDocumentId = funeralDocumentReturnObject.Id},
                    JsonRequestBehavior.AllowGet)
                : Json("", JsonRequestBehavior.AllowGet);
        }

        public ActionResult DownloadFuneralDocument(Guid funeralDocumentId)
        {
            try
            {
                var record = FuneralDocumentService.QueryFuneralDocumentById(funeralDocumentId);
                var documentContent = (byte[]) GenericModelService.GetAttributeValue(record, "DocumentContent");
                var fileName = GenericModelService.GetAttributeValue(record, "Name").ToString();
                var fileType = GenericModelService.GetAttributeValue(record, "DocumentTypeName").ToString();
                var mimeType = GenericModelService.GetAttributeValue(record, "MimeType").ToString();
                var fileExtension = Path.GetExtension(fileName);
                return File(documentContent, mimeType, fileType + fileExtension);
            }
            catch (Exception ex)
            {
                return Json(new {state = "error", message = ex.Message}, JsonRequestBehavior.AllowGet);
            }
        }
    }
}