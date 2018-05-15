using System;
using System.ComponentModel.DataAnnotations;

namespace fms.Model
{
    public class Cemetery
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string AddressId { get; set; }
        //public Address Address { get; set; }
    }
}
