using fms.Model;
using System.Configuration;
using System.Data.Entity.ModelConfiguration;

namespace fms.EF.EntityConfiguration
{
    public class NextOfKinConfiguration : EntityTypeConfiguration<NextOfKin>
    {
        public NextOfKinConfiguration()
        {
            ToTable("NextOfKin", ConfigurationManager.AppSettings["Db_Schema"]);
            HasRequired(x => x.Person)
                .WithOptional(x => x.NextOfKin);
            //HasRequired(x => x.Funeral)
            //    .WithOptional(x => x.NextOfKin);
        }
    }
}
