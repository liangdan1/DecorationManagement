using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using DecorationManagement.logic.ILogic;
using DecorationManagement.logic.Logic;

namespace DecorationManagement.logic
{
    public class LogicInstaller: IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IUserLogic>().ImplementedBy<UserLogic>().LifestylePerWebRequest());
        }
    }
}
