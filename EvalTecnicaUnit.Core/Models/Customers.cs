using EvalTecnicaUnit.Core.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace EvalTecnicaUnit.Core.Models
{
    public partial class Customers : EntityUnit
    {
        public Customers()
        {
            Phones = new HashSet<Phones>();
        }

        public override int Id { get; set; }

        [StringLength(80)]
        public string Name { get; set; }

        [StringLength(80)]
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }

        [StringLength(12)]

        public string ContactPhoneNumber { get; set; }

        [StringLength(1)]
        public string Gender { get; set; }

        [StringLength(255)]
        public string EmailAddress { get; set; }
        public virtual ICollection<Phones> Phones { get; set; }
    }
}
