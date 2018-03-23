using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DecorationManagement.DAL.Model;

namespace DecorationManagement.Controllers
{
    public class BaseController : Controller
    {
        public int PageSize = Common.Constant.DefaultPageSize;

        public BaseController()
        {
        }

        public string GetLoginUserId()
        {
            string userId = null;
            if (Session["user"] != null)
            {
                User loginUser = (User)Session["user"];
                userId = loginUser.UserId.ToString();
            }
            return userId ?? "";
        }
        public string GetLoginPassword()
        {
            string password = null;
            if (Session["logInfo"] != null)
            {
                User loginUser = (User)Session["user"];
                password = loginUser.Password;
            }
            return password ?? "";
        }

        public string GetLoginUserName()
        {
            string userName = null;
            if (Session["logInfo"] != null)
            {
                User loginUser = (User)Session["user"];
                userName = loginUser.LoginName;
            }
            return userName ?? "";
        }
    }
}