using fms.Model;
using System.Configuration;
using System.Data.Entity.ModelConfiguration;

namespace fms.EF.EntityConfiguration
{
    public class FuneralConfiguration: EntityTypeConfiguration<Funeral>
    {
        public FuneralConfiguration()
        {

            ToTable("Funeral", ConfigurationManager.AppSettings["Db_Schema"]);

            HasKey(x => x.Id);

            Property(x => x.FuneralNumber)
                .HasMaxLength(6)
                .IsRequired()
                .IsFixedLength();

        }
    }
}
