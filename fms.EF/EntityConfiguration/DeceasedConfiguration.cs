using fms.Model;
using System;
using System.Configuration;
using System.Data.Entity.ModelConfiguration;

namespace fms.EF.EntityConfiguration
{
    public class DeceasedConfiguration : EntityTypeConfiguration<Deceased>
    {
        public DeceasedConfiguration()
        {
            ToTable("Deceased", ConfigurationManager.AppSettings["Db_Schema"]);
            HasRequired(x => x.Person)
                .WithOptional(x => x.Deceased);
            HasRequired(x => x.Funeral)
                .WithRequiredDependent(x => x.Deceased);
        }
    }
}
