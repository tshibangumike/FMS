using System.Web.Mvc;

namespace fms.Web.components._base
{
    public class BaseController : Controller
    {
        public string GetCurrentUserId()
        {
            var currentUserId = HttpContext.User.Identity.Name;
            return currentUserId;
        }
        public ActionResult Index()
        {
            return View();
        }
    }
}