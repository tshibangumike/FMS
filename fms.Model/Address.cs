using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fms.Model
{
    public class Address
    {

        [Key]
        public Guid Id { get; set; }

        [Required]
        public string FullAddress { get; set; }

        public string StreetNumber { get; set; }

        public string StreetAddress { get; set; }

        public string SubLocality { get; set; }

        public string Suburb { get; set; }

        public string City { get; set; }

        public string Province { get; set; }

        public string Country { get; set; }

        public string PostalCode { get; set; }

        //public virtual Person Person { get; set; }

    }
}
