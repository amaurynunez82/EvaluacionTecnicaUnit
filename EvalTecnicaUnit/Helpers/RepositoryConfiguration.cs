using EvalTecnicaUnit.Application.Repositories;
using EvalTecnicaUnit.Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;
namespace EvalTecnicaUnit.Web.Helpers
{
    public static class RepositoryConfiguration
    {
        public static void AddRepositoriesToHandle(this IServiceCollection services)
        {
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<IPhoneRepository, PhoneRepository>();

        }

    }
}
