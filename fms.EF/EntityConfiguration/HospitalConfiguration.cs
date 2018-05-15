using fms.Model;
using System.Configuration;
using System.Data.Entity.ModelConfiguration;

namespace fms.EF.EntityConfiguration
{
    public class HospitalConfiguration : EntityTypeConfiguration<Hospital>
    {
        public HospitalConfiguration()
        {

            ToTable("Hospital", ConfigurationManager.AppSettings["Db_Schema"]);

            HasKey(x => x.Id);

            Property(x => x.Name).IsRequired();

        }
    }
}
