using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace fms.Model
{
    public class Funeral
    {

        [Key]
        public Guid Id { get; set; }

        public string FuneralNumber { get; set; }

        [ForeignKey("Deceased")]
        public Guid DeceasedId { get; set; }
        public virtual Deceased Deceased { get; set; }
        
        //[ForeignKey("Informant")]
        public Guid InformantId { get; set; }
        //public virtual Informant Informant { get; set; }

        //[ForeignKey("NextOfKin")]
        public Guid NextOfKinId { get; set; }
        //public virtual NextOfKin NextOfKin { get; set; }

        public DateTime DateOfDeath { get; set; }

        public string PlaceOfRetrievalOfBody { get; set; }

        public string PlaceOfDeath { get; set; }

        public string CauseOfDeath { get; set; }

        public string GraveNumber { get; set; }

    }
}
