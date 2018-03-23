using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.Windsor;

namespace DecorationManagement.DAL.UnitOfWork
{
    public class UnitOfWorkFactory: IUnitOfWorkFactory
    {
        private readonly IWindsorContainer _container;

        public UnitOfWorkFactory(IWindsorContainer container)
        {
            _container = container;
        }

        public IUnitOfWork GetCurrentUnitOfWork()
        {
            return _container.Resolve<IUnitOfWork>();
        }
    }
}
