using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DecorationManagement.Models
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "名字不能为空!")]
        public string Name { get; set; }

        [Required(ErrorMessage = "登录名不能为空!")]
        public string LoginName { get; set; }

        [Required(ErrorMessage = "邮件不能为空!")]
        [EmailAddress(ErrorMessage = "邮件格式不正确! ")]
        [Display(Name = "邮件")]
        public string Email { get; set; }

        [Required(ErrorMessage = "密码不能为空! ")]
        [StringLength(20, ErrorMessage = "密码最少为6位", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "确认密码不能为空! ")]
        [DataType(DataType.Password)]
        [Display(Name = "确认密码")]
        [System.ComponentModel.DataAnnotations.Compare("Password", ErrorMessage = "密码与确认密码不匹配.")]
        public string RepartPassword { get; set; }
    }
}