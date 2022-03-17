using Microsoft.EntityFrameworkCore;
using EvalTecnicaUnit.Core.Base;
using EvalTecnicaUnit.Core.Interfaces;
using EvalTecnicaUnit.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EvalTecnicaUnit.Application.Repositories
{
    public class Repository<T> : IRepository<T> where T : EntityUnit, new()
    {
        private readonly UnitDataContext _context;

        public Repository(UnitDataContext context)
        {
            _context = context;
            _context.ChangeTracker.LazyLoadingEnabled = true;

            _context.SavingChanges += Context_SavingChanges;

        }

        public DbContext Context => _context;

        public async Task<T> GetByIdAsync(int Id)
        {
            T retorno = null;

            retorno = _context.Set<T>().FirstOrDefault(x => x.Id.Equals(Id));

            return await Task.Run(() => { return retorno; });
        }

        public async Task<bool> DeleteAsync(int Id)
        {
            var entity = await GetByIdAsync(Id);
            return await DeleteAsync(entity);
        }

        async Task<bool> DeleteAsync(EntityUnit Entity)
        {
            return await Task.Run(() =>
            {
                if (Entity == null)
                    throw new Exception("DoesNotExistRecordWithThatIdInTheDatabase");

                var entry = _context.Entry(Entity);

                entry.State = Microsoft.EntityFrameworkCore.EntityState.Deleted;

                return true;
            });
        }

        public async Task<List<T>> GetAllToListAsync()
        {
            List<T> retorno = null;
            return await Task.Run(() =>
            {
                try
                {
                    retorno = GetAll().OrderBy(x=> x.Id).ToList();
                }
                catch (Exception err)
                {
                    throw new Exception(err.Message);
                }
                return retorno;
            });
        }
        public IQueryable<T> GetAll()
        {
            return _context.Set<T>();
        }

        async Task<T> IRepository<T>.SaveAsync(T Entity)
        {
            try
            {
                if (Entity.Id == 0)
                    Entity.Id = NextId();

                _context.Entry(Entity).State = Microsoft.EntityFrameworkCore.EntityState.Added;


                await _context.SaveChangesAsync();
            }
            catch (Exception err)
            {
                if (err.InnerException == null)
                    throw new Exception(err.Message);
                else
                    throw new Exception(err.InnerException.Message);
            }
            return Entity;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }


        async Task<T> IRepository<T>.UpdateAsync(T Entity)
        {
            try
            {
                var dbEntry = _context.Entry(Entity);

                _context.Entry(Entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;

                await _context.SaveChangesAsync();
            }
            catch (Exception err)
            {
                if (err.InnerException == null)
                    throw new Exception(err.Message);
                else
                    throw new Exception(err.InnerException.Message);
            }
            return Entity;
        }


        public int NextId()
        {

            var currentMaxValue = 0;
            var maxValueEntry = 0;
            try
            {
                maxValueEntry = Convert.ToInt32(_context.Set<T>().Select(x => x.Id).DefaultIfEmpty().Max()) ;
            }
            catch { }

                currentMaxValue = maxValueEntry + 1;

            return currentMaxValue;
        }

        private void Context_SavingChanges(object sender, Microsoft.EntityFrameworkCore.SavingChangesEventArgs e)
        {
            var context = (UnitDataContext)sender;
            if (context != null)
            {
                var entries = context.ChangeTracker.Entries().Where(t => t.State == Microsoft.EntityFrameworkCore.EntityState.Added ||
                t.State == Microsoft.EntityFrameworkCore.EntityState.Modified ||
                t.State == Microsoft.EntityFrameworkCore.EntityState.Deleted);

                foreach (var entry in entries)
                {
                    if (entry.Entity is EntityUnit entity)
                    {
                        if (entry.State == Microsoft.EntityFrameworkCore.EntityState.Added)
                        {
                            if (entity.Id == 0)
                                entity.Id = NextId();
                        }
                    }
                }
            }
        }

    }
}
