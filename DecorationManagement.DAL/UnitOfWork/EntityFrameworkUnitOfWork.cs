using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DecorationManagement.DAL.UnitOfWork
{
    public class EntityFrameworkUnitOfWork:IUnitOfWork
    {
        private bool _disposed;
        private readonly IDbFactory _factory;
        private DbContext DataContext => _factory.GetContext();

        public EntityFrameworkUnitOfWork(IDbFactory factory)
        {
            _factory = factory;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Commit()
        {
            DataContext.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    DataContext.Dispose();
                }
            }
            _disposed = true;
        }
    }
}
