using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DecorationManagement.DAL.Model;

namespace DecorationManagement.logic.ILogic
{
    public interface IUserLogic
    {
        void Create(User model);
        void Edit(User model);
        void Delete(int id);
        User Get(int id);
        void UpdateUserLastLoginTime(int userId);
        IEnumerable<User> GetAll();
        User GetUserByEmailAndPassword(string email, string password);
        IEnumerable<User> GetUserByWhereCondition(string whereCondition);
    }
}
