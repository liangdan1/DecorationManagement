using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DecorationManagement.Common;
using DecorationManagement.DAL.Model;
using DecorationManagement.logic.ILogic;
using DecorationManagement.Models;

namespace DecorationManagement.Controllers
{
    public class UserController : BaseController
    {
        private readonly IUserLogic _userLogic;

        public UserController(IUserLogic userLogic)
        {
            _userLogic = userLogic;
        }

        public ActionResult Management()
        {
            UserViewModel userViewModel = GetUserViewModel("", 1);

            return View("Management", userViewModel);
        }

        public ActionResult Query(UserViewModel model, int? pageIndex)
        {
            model = this.GetUserViewModel(model.WhereCondition, pageIndex);

            return View("Management", model);
        }

        private UserViewModel GetUserViewModel(string whereCondition, int? page)
        {
            UserViewModel userListViewModel = new UserViewModel();
            PagingInfo<UserDomainModel> userPaging = null;

            var userList = _userLogic.GetUserByWhereCondition(whereCondition);
            var enumerable = userList as IList<User> ?? userList.ToList();
            if (enumerable.Any())
            {
                var listmodel = new List<UserDomainModel>();
                foreach (var user in enumerable)
                {
                    var usermodel = new UserDomainModel();
                    ConvertModel.ConvertMoudle(user, usermodel);
                    listmodel.Add(usermodel);
                }
                userPaging = new PagingInfo<UserDomainModel>(PageSize, listmodel) {PageIndex = page ?? 1};
                userListViewModel.Users = userPaging.GetPagingData();
            }

            userListViewModel.PagingInfo = userPaging;
            userListViewModel.User = new UserDomainModel();
            return userListViewModel;
        }

        public ActionResult Create(UserDomainModel model)
        {
            User user = new User();
            ConvertModel.ConvertMoudle(model, user);
            if (model.UserId == 0)
            {
                _userLogic.Create(user);
            }
            else
            {
                _userLogic.Edit(user);
            }
            return RedirectToAction("Management");

        }

        public JsonResult GetUser(int id)
        {
            var user = new User();
            if (id != 0)
            {
                user = _userLogic.Get(id);
            }
            return Json(user, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Delete(string userId)
        {
            if (!string.IsNullOrEmpty(userId))
            {
                _userLogic.Delete(Convert.ToInt32(userId));
            }
            return RedirectToAction("Management");
        }
    }
}