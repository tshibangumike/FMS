using fms.EF.EntityConfiguration;
using fms.Model;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace fms.EF
{
    public class FMSContext : DbContext
    {
        public FMSContext() : base("name = fmsContext")
        {
        }

        public virtual DbSet<Address> Addresses { get; set; }
        public virtual DbSet<Cemetery> Cemeteries { get; set; }
        public virtual DbSet<Deceased> Deceaseds { get; set; }
        public virtual DbSet<Funeral> Funerals { get; set; }
        public virtual DbSet<Gender> Genders { get; set; }
        public virtual DbSet<Hospital> Hospitals { get; set; }
        public virtual DbSet<Person> Persons { get; set; }
        public virtual DbSet<Informant> Informants { get; set; }
        public virtual DbSet<NextOfKin> NextOfKins { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            modelBuilder.Configurations.Add(new AddressConfiguration());
            modelBuilder.Configurations.Add(new CemeteryConfiguration());
            modelBuilder.Configurations.Add(new DeceasedConfiguration());
            modelBuilder.Configurations.Add(new FuneralConfiguration());
            modelBuilder.Configurations.Add(new GenderConfiguration());
            modelBuilder.Configurations.Add(new HospitalConfiguration());
            modelBuilder.Configurations.Add(new InformantConfiguration());
            modelBuilder.Configurations.Add(new NextOfKinConfiguration());
            modelBuilder.Configurations.Add(new PersonConfiguration());
        }
    }
}
