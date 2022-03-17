using EvalTecnicaUnit.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;

namespace EvalTecnicaUnit.EntityFramework
{
    public class UnitDataContext : DbContext
    {
        public UnitDataContext(DbContextOptions<UnitDataContext> options) : base(options)
        {
            this.ChangeTracker.LazyLoadingEnabled = true;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseLazyLoadingProxies(true);
        }

        public virtual DbSet<Customers> Customers { get; set; }
        public virtual DbSet<Phones> Phones { get; set; }

    }


}
