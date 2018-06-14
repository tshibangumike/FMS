using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using fms.Service;
using Microsoft.Reporting.WinForms;

namespace fms.Web.components.report
{
    public class ReportController : Controller
    {
        
        public ActionResult GetConfirmationReport(Guid funeralId)
        {
            var localReport = new LocalReport();
            var path = Path.Combine(Server.MapPath("~/Components/report"), "ConfirmationLetter.rdlc");
            if (System.IO.File.Exists(path))
            {
                localReport.ReportPath = path;
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }

            var reportData = ReportService.GetConfirmationLetterReportData(funeralId);

            var reportDataSource = new ReportDataSource
            {
                Value = reportData,
                Name = "DSFuneral"
            };
            localReport.SetParameters(new ReportParameter("funeralId", funeralId.ToString()));
            localReport.DataSources.Add(reportDataSource);

            const string deviceInfo = "<DeviceInfo>" +
                                      "  <OutputFormat>PDF</OutputFormat>" +
                                      "  <PageWidth>8.5in</PageWidth>" +
                                      "  <PageHeight>11in</PageHeight>" +
                                      "  <MarginTop>0.5in</MarginTop>" +
                                      "  <MarginLeft>1in</MarginLeft>" +
                                      "  <MarginRight>1in</MarginRight>" +
                                      "  <MarginBottom>0.5in</MarginBottom>" +
                                      "</DeviceInfo>";

            var deceasedName = reportData.Rows[0].ItemArray[3];
            var funeralNumber = reportData.Rows[0].ItemArray[0];

            var reportName = "Confirmation Letter - " + funeralNumber + " - " + deceasedName + ".pdf";

            var renderedBytes = localReport.Render(
                "PDF",
                deviceInfo,
                out var mimeType,
                out _,
                out _,
                out _,
                out _);
            return File(renderedBytes, mimeType, reportName);
        }

        public ActionResult GetInvoiceReport(Guid funeralId)
        {
            var localReport = new LocalReport();
            var path = Path.Combine(Server.MapPath("~/Components/report"), "Invoice.rdlc");
            if (System.IO.File.Exists(path))
            {
                localReport.ReportPath = path;
            }
            else
            {
                return Json(null, JsonRequestBehavior.AllowGet);
            }

            var reportFuneralDetail = ReportService.GetFuneralDetailReportData(funeralId);
            var reportBankAccount = ReportService.GetBankAccountReportData();
            var reportItemsBought = ReportService.GetItemsBoughtReportData(funeralId);

            var dsFuneralDetail = new ReportDataSource
            {
                Value = reportFuneralDetail,
                Name = "DSFuneralDetail"
            };
            var dsBankAccount = new ReportDataSource
            {
                Value = reportBankAccount,
                Name = "DSBankAccount"
            };
            var dsItemsBought = new ReportDataSource
            {
                Value = reportItemsBought,
                Name = "DSItemsBought"
            };
            localReport.SetParameters(new ReportParameter("funeralId", funeralId.ToString()));
            localReport.DataSources.Add(dsFuneralDetail);
            localReport.DataSources.Add(dsBankAccount);
            localReport.DataSources.Add(dsItemsBought);

            const string deviceInfo = "<DeviceInfo>" +
                                      "  <OutputFormat>PDF</OutputFormat>" +
                                      "  <PageWidth>8.5in</PageWidth>" +
                                      "  <PageHeight>11in</PageHeight>" +
                                      "  <MarginTop>0.5in</MarginTop>" +
                                      "  <MarginLeft>1in</MarginLeft>" +
                                      "  <MarginRight>1in</MarginRight>" +
                                      "  <MarginBottom>0.5in</MarginBottom>" +
                                      "</DeviceInfo>";

            var deceasedName = reportFuneralDetail.Rows[0].ItemArray[1];
            var funeralNumber = reportFuneralDetail.Rows[0].ItemArray[0];

            var reportName = "Invoice - " + funeralNumber + " - " + deceasedName + ".pdf";

            var renderedBytes = localReport.Render(
                "PDF",
                deviceInfo,
                out var mimeType,
                out _,
                out _,
                out _,
                out _);
            return File(renderedBytes, mimeType, reportName);
        }

    }
}