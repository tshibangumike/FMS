using System;

namespace fms.Model
{
    public class Deceased
    {
        public Guid PersonId { get; set; }
        public virtual Guid FuneralId { get; set; }
    }
}
