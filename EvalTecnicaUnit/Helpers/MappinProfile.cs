

using AutoMapper;
using EvalTecnicaUnit.Core.Dto.Customer;
using EvalTecnicaUnit.Core.Dto.Phone;
using EvalTecnicaUnit.Core.Models;

namespace EvalTecnicaUnit.Web.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CustomerUpdateDto, Customers>().ReverseMap();
            CreateMap<CustomerDto, Customers>().ReverseMap();
            CreateMap<PhoneDto, Phones>().ReverseMap();
        }
    }
}