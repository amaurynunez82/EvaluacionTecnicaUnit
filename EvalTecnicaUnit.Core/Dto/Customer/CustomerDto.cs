using EvalTecnicaUnit.Core.Dto.Phone;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace EvalTecnicaUnit.Core.Dto.Customer
{
    public class CustomerDto
    {
        public CustomerDto()
        {
            Phones = new List<PhoneDto>();
        }

        public int Id { get; set; }

        [StringLength(80)]
        public string Name { get; set; }

        [StringLength(80)]
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }

        [StringLength(1)]
        public string Gender { get; set; }

        [StringLength(255)]
        public string EmailAddress { get; set; }

        public string ContactPhoneNumber { get; set; }

        public virtual List<PhoneDto> Phones { get; set; }
    }
}