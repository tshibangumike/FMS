using System;
using System.ComponentModel.DataAnnotations;

namespace fms.Model
{
    public class Person
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string SAIdNumber { get; set; }

        [Required]
        public DateTime? DateOfBirth { get; set; }

        [Required]
        public int GenderId { get; set; }
        public Gender Gender { get; set; }

        public Guid AddressId { get; set; }
        //public Address Address { get; set; }

        public byte[] Photo { get; set; }

        public virtual Informant Informant { get; set; }

        public virtual NextOfKin NextOfKin { get; set; }

        public virtual Deceased Deceased { get; set; }

    }
}
