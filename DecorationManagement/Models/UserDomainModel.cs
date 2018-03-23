using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DecorationManagement.Models
{
    public class UserDomainModel
    {
        public int UserId { get; set; }

        public string Name { get; set; }

        public string LoginName { get; set; }
        public string Email { get; set; }

        public string Password { get; set; }

        public int ErrorTime { get; set; }

        public DateTime? RegisterTime { get; set; }

        public DateTime? LastLoginTime { get; set; }

        public bool Enabled { get; set; }
    }
}