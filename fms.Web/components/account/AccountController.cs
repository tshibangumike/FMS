using fms.Service;
using System;
using System.Linq;
using System.Web.Mvc;

namespace fms.Web.components.account
{
    public class AccountController : Controller
    {
        public ActionResult Authenticate(string username, string password)
        {

            var credential = CredentialService.QueryCredentialByUsernameByPassword(username, password);
            if (credential == null)
            {
                return Json("error", JsonRequestBehavior.AllowGet);
            }
            var appUserId = (Guid)credential.FirstOrDefault(x => x.Key == "AppUserId").Value;
            if (appUserId == null) return Json("error", JsonRequestBehavior.AllowGet);

            var appUser = AppUserService.QueryAppUserById(appUserId);

            AccountService.SetCookie(Response, appUser);

            return Json(appUser, JsonRequestBehavior.AllowGet);

        }

    }
}