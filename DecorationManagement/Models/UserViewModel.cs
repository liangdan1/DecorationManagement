using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DecorationManagement.Models
{
    public class UserViewModel
    {
        public UserViewModel()
        {
            Users =  new List<UserDomainModel>();
        }

        public IList<UserDomainModel> Users { get; set; }
        public string WhereCondition { get; set; }
        public PagingInfo<UserDomainModel> PagingInfo { get; set; }
        public UserDomainModel User { get; set; }
    }
}