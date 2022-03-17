using EvalTecnicaUnit.Core.Dto.Customer;
using System.ComponentModel.DataAnnotations;

namespace EvalTecnicaUnit.Core.Dto.Phone
{
    public class PhoneDto
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        [StringLength(10)]
        public string Phone { get; set; }
    }
}