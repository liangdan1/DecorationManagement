using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using DecorationManagement.Common;
using DecorationManagement.DAL.Model;
using DecorationManagement.logic.ILogic;
using DecorationManagement.Models;

namespace DecorationManagement.Controllers
{
    public class LoginController : Controller
    {
        public readonly IUserLogic _userLogic;

        public LoginController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }

        [AllowAnonymous]
        public ActionResult Signin(string returnUrl)
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Signin(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var user = _userLogic.GetUserByEmailAndPassword(model.Email, model.Password);
                if (user == null)
                {
                    TempData[Constant.ErrorMessage] = "用户名或者密码不正确!";
                }
                else
                {
                    FormsAuthentication.SetAuthCookie(model.Email, false);
                    Session[Constant.SessionUser] = user;
                    _userLogic.UpdateUserLastLoginTime(user.UserId);

                    return RedirectToAction(Constant.ActionIndex, Constant.ControllerDashboard);
                }
            }
            ViewBag.returnUrl = returnUrl;

            return View(model);
        }

        public ActionResult Register()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new User();
                ConvertModel.ConvertMoudle(model, user);
                user.Enabled = true;
                user.ErrorTime = 0;
                user.RegisterTime = DateTime.Now;
                _userLogic.Create(user);

                return RedirectToAction("Management","User");
            }
            return View();
        }

        public ActionResult Logout()
        {
            FormsAuthentication.SignOut();
            return RedirectToAction("Signin");
        }
    }
}