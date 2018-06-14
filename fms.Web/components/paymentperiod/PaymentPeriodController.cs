using System.Web.Mvc;
using fms.Service;
using fms.Web.components._base;

namespace fms.Web.components.paymentperiod
{
    public class PaymentPeriodController : BaseController
    {
        public ActionResult GetActivePaymentPeriods()
        {
            var records = PaymentPeriodService.QueryActiveMonths();
            return Json(records, JsonRequestBehavior.AllowGet);
        }
    }
}