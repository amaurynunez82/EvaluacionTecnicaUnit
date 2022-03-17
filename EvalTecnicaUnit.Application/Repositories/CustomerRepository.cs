
using EvalTecnicaUnit.Core.Interfaces;
using EvalTecnicaUnit.Core.Models;
using EvalTecnicaUnit.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvalTecnicaUnit.Application.Repositories
{
    public class CustomerRepository : Repository<Customers>, ICustomerRepository
    {
        private UnitDataContext _context;
        public CustomerRepository(UnitDataContext context) : base(context)
        {
            _context = context;
        }
    }
}
