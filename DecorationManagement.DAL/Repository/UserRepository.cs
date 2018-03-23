using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DecorationManagement.DAL.IRepository;
using DecorationManagement.DAL.Model;
using DecorationManagement.DAL.UnitOfWork;

namespace DecorationManagement.DAL.Repository
{
    public class UserRepository: RepositoryBase<User>, IUserRepository
    {
        private readonly IDbFactory _dbFactory;
        private DbContext DataContext => _dbFactory.GetContext();
        private IDbSet<User> DbSet => DataContext.Set<User>();

        public UserRepository(IDbFactory dbfactory) : base(dbfactory)
        {
            _dbFactory = dbfactory;
        }
    }
}
