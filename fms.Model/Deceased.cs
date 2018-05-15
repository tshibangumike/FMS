using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace fms.Model
{
    public class Deceased
    {
        [Key]
        [ForeignKey("Person")]
        public Guid PersonId { get; set; }

        public virtual Person Person { get; set; }
        public virtual Funeral Funeral { get; set; }
    }
}
