using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DecorationManagement.DAL.Migrations;
using DecorationManagement.DAL.Model;

namespace DecorationManagement.DAL
{
    public class DecorationContext : DbContext
    {
        protected DecorationContext():base("name=DecorationContext")
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<DecorationContext, Configuration>());
        }

        public DbSet<User> Users { get; set; }
        
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
