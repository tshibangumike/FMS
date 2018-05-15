using fms.Model;
using System.Configuration;
using System.Data.Entity.ModelConfiguration;

namespace fms.EF.EntityConfiguration
{
    public class AddressConfiguration : EntityTypeConfiguration<Address>
    {
        public AddressConfiguration()
        {

            ToTable("Address", ConfigurationManager.AppSettings["Db_Schema"]);

            HasKey(x => x.Id);

            Property(x => x.FullAddress).IsRequired();

            Property(x => x.PostalCode)
                    .HasMaxLength(5);

        }
    }
}
