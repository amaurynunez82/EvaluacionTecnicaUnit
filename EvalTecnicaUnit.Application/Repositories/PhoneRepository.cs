using EvalTecnicaUnit.Core.Interfaces;
using EvalTecnicaUnit.Core.Models;
using EvalTecnicaUnit.EntityFramework;

namespace EvalTecnicaUnit.Application.Repositories
{
    public class PhoneRepository : Repository<Phones>, IPhoneRepository
    {
        private UnitDataContext _context;
        public PhoneRepository(UnitDataContext context) : base(context)
        {
            _context = context;
        }
    }
}
