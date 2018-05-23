using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace fms.Model
{
    public class Informant
    {
        public Guid PersonId { get; set; }
        public string RelationshipToDeceased { get; set; }
    }
}
