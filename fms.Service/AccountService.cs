using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Security;

namespace fms.Service
{
    public class AccountService
    {
        public static void SetCookie(HttpResponseBase response, Dictionary<string, object> appUser)
        {
            var appUserId = GenericModelService.GetAttributeValue(appUser, "Id");
            // Create the authentication ticket with custom user data.
            var serializer = new JavaScriptSerializer();
            string userData = serializer.Serialize(appUser);
            FormsAuthenticationTicket ticket = new FormsAuthenticationTicket(
                    1,
                    appUserId.ToString(),
                    DateTime.Now,
                    DateTime.Now.AddHours(1),
                    false,
                    userData,
                    FormsAuthentication.FormsCookiePath);
            // Encrypt the ticket.  
            string encTicket = FormsAuthentication.Encrypt(ticket);
            // Create the cookie.
            var httpCookie = new HttpCookie(FormsAuthentication.FormsCookieName, encTicket);
            response.Cookies.Add(httpCookie);
        }
    }
}
