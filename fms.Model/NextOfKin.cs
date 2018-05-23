using System;

namespace fms.Model
{
    public class NextOfKin
    {
        public Guid PersonId { get; set; }
        public string RelationshipToDeceased { get; set; }
    }
}
