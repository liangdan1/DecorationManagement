using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DecorationManagement.Common;
using DecorationManagement.DAL.IRepository;
using DecorationManagement.DAL.Model;
using DecorationManagement.DAL.UnitOfWork;
using DecorationManagement.logic.ILogic;

namespace DecorationManagement.logic.Logic
{
    public class UserLogic:IUserLogic
    {
        private readonly IUserRepository _userRepository;
        private readonly IUnitOfWorkFactory _unitOfWorkFactory;

        public UserLogic(IUserRepository userRepository, IUnitOfWorkFactory unitOfWorkFactory)
        {
            _userRepository = userRepository;
            _unitOfWorkFactory = unitOfWorkFactory;
        }

        public void Create(User model)
        {
            using (var unitWork = _unitOfWorkFactory.GetCurrentUnitOfWork())
            {
                var user  =  new User();
                ConvertModel.ConvertMoudle(model, user);
                _userRepository.Create(user);
                unitWork.Commit();
            }
        }

        public void Edit(User model)
        {
            using (var unitWork = _unitOfWorkFactory.GetCurrentUnitOfWork())
            {
                var user = new User();
                ConvertModel.ConvertMoudle(model, user);
                _userRepository.Edit(user);
                unitWork.Commit();
            }
        }

        public void Delete(int id)
        {
            using (var unitWork = _unitOfWorkFactory.GetCurrentUnitOfWork())
            {
                _userRepository.Delete(id);
                unitWork.Commit();
            }
        }

        public User Get(int id)
        {
            var user = _userRepository.Get(id);
            return user;
        }

        public void UpdateUserLastLoginTime(int userId)
        {
            using (var unitWork = _unitOfWorkFactory.GetCurrentUnitOfWork())
            {
                var user = _userRepository.Get(userId);
                user.LastLoginTime = DateTime.Now;
                _userRepository.Edit(user);
                unitWork.Commit();
            }
        }

        public IEnumerable<User> GetAll()
        {
            return _userRepository.Query().AsEnumerable();
        }

        public User GetUserByEmailAndPassword(string email, string password)
        {
            return _userRepository.Query().FirstOrDefault(n => n.Email == email && n.Password == password);
        }

        public IEnumerable<User> GetUserByWhereCondition(string whereCondition)
        {
            return _userRepository.Query().Where(n => string.IsNullOrEmpty(whereCondition) || n.Name.Contains(whereCondition) || n.Email.Contains(whereCondition)).AsEnumerable();
        }
    }
}
