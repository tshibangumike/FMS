using fms.Service;
using System;
using System.Linq;
using System.Web.Mvc;
using fms.Web.components._base;
using System.Web.Security;

namespace fms.Web.components.account
{
    public class AccountController : BaseController
    {
        public ActionResult Login(string username, string password)
        {
            var credential = CredentialService.QueryCredentialByUsernameByPassword(username, password);
            if (credential == null)
            {
                return Json(new { state = "error", message = "Invalid username and password combination" }, JsonRequestBehavior.AllowGet);
            }
            var appUserId = (Guid)credential.FirstOrDefault(x => x.Key == "AppUserId").Value;
            if (appUserId == Guid.Empty) return Json(new { state = "error", message = "Invalid username and password combination" }, JsonRequestBehavior.AllowGet);

            var appUser = AppUserService.QueryAppUserById(appUserId);

            AccountService.SetCookie(Response, appUser);

            return Json(new { state = "success", appUser = appUser }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return Json(new { }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetCurrentUser()
        {
            var currentUserId = GetCurrentUserId();
            var appUser = AppUserService.QueryAppUserById(Guid.Parse(currentUserId));
            return Json(new { state = "success", appUser = appUser }, JsonRequestBehavior.AllowGet);
        }
    }
}