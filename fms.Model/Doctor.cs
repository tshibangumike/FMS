using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace fms.Model
{
    public class Doctor
    {
        public Guid PersonId { get; set; }
        public string HospitalId { get; set; }
    }
}
