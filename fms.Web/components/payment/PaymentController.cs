using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using fms.Service;
using fms.Web.components._base;

namespace fms.Web.components.payment
{
    public class PaymentController : BaseController
    {
        public ActionResult GetPaymentsByMemberId(Guid memberId)
        {
            var records = PaymentService.QueryPaymentsByMemberId(memberId);
            return Json(records, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddPayment(List<KeyValue> payment)
        {
            try
            {
                if (payment == null || payment.Count <= 0)
                    return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);

                KeyValueService.AddAttribute(payment, "Id", Guid.NewGuid().ToString());
                KeyValueService.AddAttribute(payment, "CreatedOn", DateTime.Now.ToString(CultureInfo.InvariantCulture));
                KeyValueService.AddAttribute(payment, "CreatedById", GetCurrentUserId());

                var paymentReturnObject = PaymentService.InsertPayment(payment);
                if (paymentReturnObject.State == "success")
                {
                    return Json(new {state = "success", paymentId = paymentReturnObject.Id},
                        JsonRequestBehavior.AllowGet);
                }

                return Json(new {state = "error", message = ""}, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new {state = "error", message = ex.Message}, JsonRequestBehavior.AllowGet);
            }
        }
    }
}