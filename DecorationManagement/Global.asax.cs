using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using DecorationManagement.Installer;

namespace DecorationManagement
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public MvcApplication()
        {
            DependencyInstallercs.Initialize();
        }

        public override void Dispose()
        {
            DependencyInstallercs.Container.Dispose();
            base.Dispose();
        }

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            var controllerFactory = new WindsorControllerFactory(DependencyInstallercs.Container.Kernel);
            ControllerBuilder.Current.SetControllerFactory(controllerFactory);
        }
    }
}
