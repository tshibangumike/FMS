using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Web;
using System.Web.Mvc;
using fms.Service;
using fms.Web.components._base;

namespace fms.Web.components.document
{
    public class DocumentController : BaseController
    {

        public ActionResult AddDocument(HttpPostedFileBase proofOfPayment)
        {
            try
            {
                if (proofOfPayment == null)
                    return Json(new { state = "error", message = "" }, JsonRequestBehavior.AllowGet);

                var documentId = Guid.NewGuid().ToString();

                var document = new List<KeyValue>();
                KeyValueService.AddAttribute(document, "Id", documentId);
                KeyValueService.AddAttribute(document, "FileName", proofOfPayment.FileName);
                KeyValueService.AddAttribute(document, "MimeType", proofOfPayment.ContentType);
                KeyValueService.AddAttribute(document, "Size", proofOfPayment.ContentLength.ToString());
                KeyValueService.AddAttribute(document, "CreatedOn",
                    DateTime.Now.ToString(CultureInfo.InvariantCulture));
                KeyValueService.AddAttribute(document, "CreatedById", GetCurrentUserId());

                var stream = proofOfPayment.InputStream;
                var binaryReader = new BinaryReader(stream);
                var bytes = binaryReader.ReadBytes((int)stream.Length);

                var documentReturnObject = DocumentService.InsertDocument(document, bytes);
                if (documentReturnObject.State == "success")
                {
                    return Json(new { state = "success", documentId = documentReturnObject.Id },
                        JsonRequestBehavior.AllowGet);
                }

                return Json(new { state = "error", message = "" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = "error", message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DownloadDocument(Guid documentId, string documentName)
        {
            try
            {
                var record = DocumentService.QueryDocumentById(documentId);
                var fileContent = (byte[])GenericModelService.GetAttributeValue(record, "FileContent");
                var fileName = GenericModelService.GetAttributeValue(record, "FileName").ToString();
                var mimeType = GenericModelService.GetAttributeValue(record, "MimeType").ToString();
                var fileExtension = Path.GetExtension(fileName);
                return File(fileContent, mimeType, documentName + fileExtension);
            }
            catch (Exception ex)
            {
                return Json(new { state = "error", message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}