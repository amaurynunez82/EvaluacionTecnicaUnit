using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using EvalTecnicaUnit.Core.Dto.Customer;
using EvalTecnicaUnit.Core.Interfaces;
using EvalTecnicaUnit.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EvalTecnicaUnit.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CustomerController : Controller
    {
        private readonly ICustomerRepository _customerRepository;
        private readonly IPhoneRepository _phoneRepository;
        private IMapper _mapper;

        public CustomerController(ICustomerRepository customerRepository,
            IMapper mapper, IPhoneRepository phoneRepository)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
            _phoneRepository = phoneRepository;
        }

        public IActionResult Index()
        {
            return View();
        }


        [HttpPost("Create")]
        public virtual async Task<CustomerDto> CreateAsync([FromBody] CustomerUpdateDto Entity)
        {
            CustomerDto ret = new CustomerDto();

            var _entity = _mapper.Map<Customers>(Entity);

            await _customerRepository.SaveAsync(_entity);

            foreach (var item in Entity.Phones)
            {
                var entityPhone = _mapper.Map<Phones>(item);
                entityPhone.CustomerId = _entity.Id;
                await _phoneRepository.SaveAsync(entityPhone);
            }

            await _customerRepository.SaveChangesAsync();

            ret = _mapper.Map<CustomerDto>(_entity);

            return ret;
        }

        [HttpPut("Update")]

        public virtual async Task<CustomerDto> UpdateAsync([FromBody] Customers Entity)
        {
            CustomerDto rt = new CustomerDto();

            await _customerRepository.UpdateAsync(Entity);

            foreach (var item in Entity.Phones)
            {
                var entityPhone = _mapper.Map<Phones>(item);
                if (entityPhone.Id == 0)
                {
                    entityPhone.CustomerId = Entity.Id;
                    await _phoneRepository.SaveAsync(entityPhone);
                }
                else
                    await _phoneRepository.UpdateAsync(entityPhone);
            }

            await _customerRepository.SaveChangesAsync();

            rt = _mapper.Map<CustomerDto>(Entity);

            return rt;
        }


        [HttpGet]
        [Route("{Id}")]
        public virtual async Task<CustomerDto> GetByIdAsync(int Id)
        {
            CustomerDto rt = new CustomerDto();

            var result = await _customerRepository.GetByIdAsync(Id);

            rt = _mapper.Map<CustomerDto>(result);

            return rt;
        }

        [HttpDelete]
        [Route("{Id}")]
        public virtual async Task<bool> DeleteByIdAsync(int Id)
        {
            bool deleted = false;

            deleted = await _customerRepository.DeleteAsync(Id);
            await _customerRepository.SaveChangesAsync();
            return deleted;

        }

        [HttpGet("GetAll")]
        public virtual async Task<List<CustomerUpdateDto>> GetAllAsync()
        {
            List<CustomerUpdateDto> retorno = new List<CustomerUpdateDto>();

            var Records = await _customerRepository.GetAllToListAsync();


            retorno = _mapper.Map<List<CustomerUpdateDto>>(Records);

            return retorno;
        }
    }
}
