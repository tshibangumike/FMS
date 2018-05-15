using fms.Model;
using System.Configuration;
using System.Data.Entity.ModelConfiguration;

namespace fms.EF.EntityConfiguration
{
    public class InformantConfiguration : EntityTypeConfiguration<Informant>
    {
        public InformantConfiguration()
        {
            ToTable("Informant", ConfigurationManager.AppSettings["Db_Schema"]);
            HasRequired(x => x.Person)
                .WithOptional(x => x.Informant);
            //HasRequired(x => x.Funeral)
            //    .WithOptional(x => x.Informant);
        }
    }
}
