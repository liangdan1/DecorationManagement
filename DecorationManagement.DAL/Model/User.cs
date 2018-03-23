using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecorationManagement.DAL.Model
{
     public class User
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
