using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using DecorationManagement.DAL.IRepository;
using DecorationManagement.DAL.Repository;
using DecorationManagement.DAL.UnitOfWork;

namespace DecorationManagement.DAL
{
    public class RepositoryInstaller:IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IUnitOfWorkFactory>().ImplementedBy<UnitOfWorkFactory>().LifestylePerWebRequest(),
                Component.For<IUnitOfWork>().ImplementedBy<EntityFrameworkUnitOfWork>().LifestylePerWebRequest(),
                Component.For<IDbFactory>().ImplementedBy<DataBaseFactory>().LifestyleSingleton(),
                Component.For<DecorationContext>().LifestylePerWebRequest(),
                Component.For<IUserRepository>().ImplementedBy<UserRepository>().LifestyleSingleton()
            );
        }
    }
}
