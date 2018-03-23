using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace DecorationManagement.Models
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "邮件不能为空!")]
        [Display(Name = "Email")]
        [EmailAddress(ErrorMessage = "邮件格式不正确! ")]
        public string Email { get; set; }

        [Required(ErrorMessage = "密码不能为空! ")]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}