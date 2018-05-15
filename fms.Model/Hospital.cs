using System;
using System.ComponentModel.DataAnnotations;

namespace fms.Model
{
    public class Hospital
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public Guid AddressId { get; set; }
    }
}
