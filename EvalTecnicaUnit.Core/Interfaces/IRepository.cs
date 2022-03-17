using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvalTecnicaUnit.Core.Interfaces
{
    public interface IRepository<T>
    {
        Task<T> SaveAsync(T Entity);
        Task<T> UpdateAsync(T Entity);
        Task<bool> DeleteAsync(int Id);
        IQueryable<T> GetAll();
        Task<List<T>> GetAllToListAsync();
        Task SaveChangesAsync();
        Task<T> GetByIdAsync(int Id);
        int NextId();
        DbContext Context { get; }
    }
}
