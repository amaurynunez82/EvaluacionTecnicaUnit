using EvalTecnicaUnit.Core.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

#nullable disable

namespace EvalTecnicaUnit.Core.Models
{
    public partial class Phones : EntityUnit
    {

        public override int Id { get; set; }

        public int CustomerId { get; set; }

        [StringLength(12)]
        public string Phone { get; set; }


        [ForeignKey("CustomerId")]
        public virtual Customers Customer { get; set; }
    }
}
