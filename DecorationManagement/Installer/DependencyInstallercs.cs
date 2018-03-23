using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using Castle.Windsor.Installer;
using DecorationManagement.DAL;
using DecorationManagement.logic;
using Component = Castle.MicroKernel.Registration.Component;

namespace DecorationManagement.Installer
{
    public static class DependencyInstallercs
    {
        private static IWindsorContainer _container;

        public static void Initialize()
        {
            _container = new WindsorContainer();
            _container.Install(
                FromAssembly.This(),
                FromAssembly.Containing<RepositoryInstaller>(),
                FromAssembly.Containing<LogicInstaller>()
            );

            _container.Register(Component.For<IWindsorContainer>().Instance(_container).LifestyleSingleton());
        }

        public static IWindsorContainer Container
        {
            get
            {
                return _container;
            }
        }
    }

    public class ControllersInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(Classes.FromThisAssembly().BasedOn<Controller>().LifestyleTransient());
        }
    }
}