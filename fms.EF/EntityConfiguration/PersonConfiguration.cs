using fms.Model;
using System.Configuration;
using System.Data.Entity.ModelConfiguration;

namespace fms.EF
{
    public class PersonConfiguration : EntityTypeConfiguration<Person>
    {
        public PersonConfiguration()
        {
            ToTable("Person", ConfigurationManager.AppSettings["Db_Schema"]);

            HasKey(s => s.Id);

            Property(p => p.FirstName)
                    .HasMaxLength(50);

            Property(p => p.LastName)
                    .HasMaxLength(50);

            Property(x => x.SAIdNumber)
                .HasMaxLength(13);

            Property(p => p.DateOfBirth)
                    .HasColumnType("datetime2");

            HasRequired(s => s.Gender)
              .WithMany(g => g.Persons)
              .HasForeignKey(s => s.GenderId);

        }
    }
}
