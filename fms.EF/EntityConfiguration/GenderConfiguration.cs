using fms.Model;
using System;
using System.Configuration;
using System.Data.Entity.ModelConfiguration;


namespace fms.EF.EntityConfiguration
{
    public class GenderConfiguration : EntityTypeConfiguration<Gender>
    {
        public GenderConfiguration()
        {
            ToTable("Gender", ConfigurationManager.AppSettings["Db_Schema"]);

            HasKey(s => s.Id);

            Property(p => p.Name)
                .IsRequired()
                .HasMaxLength(50);

        }
    }
}
