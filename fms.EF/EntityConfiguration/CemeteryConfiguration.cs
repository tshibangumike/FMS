using fms.Model;
using System.Configuration;
using System.Data.Entity.ModelConfiguration;

namespace fms.EF.EntityConfiguration
{
    public class CemeteryConfiguration : EntityTypeConfiguration<Cemetery>
    {
        public CemeteryConfiguration()
        {

            ToTable("Cemetery", ConfigurationManager.AppSettings["Db_Schema"]);

            HasKey(x => x.Id);

            Property(x => x.Name).IsRequired();

        }
    }
}