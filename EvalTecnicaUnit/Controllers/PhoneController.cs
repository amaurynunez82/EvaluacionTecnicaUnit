using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using EvalTecnicaUnit.Core.Dto.Phone;
using EvalTecnicaUnit.Core.Interfaces;
using EvalTecnicaUnit.Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EvalTecnicaUnit.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PhoneController : Controller
    {
        private readonly IPhoneRepository _phoneRepository;
        private IMapper _mapper;

        public PhoneController(IPhoneRepository customerRepository,
            IMapper mapper, IPhoneRepository phoneRepository)
        {
            _mapper = mapper;
            _phoneRepository = phoneRepository;
        }

        public IActionResult Index()
        {
            return View();
        }




        [HttpGet]
        [Route("{Id}")]
        public virtual async Task<PhoneDto> GetByIdAsync(int Id)
        {
            PhoneDto rt = new PhoneDto();

            var result = await _phoneRepository.GetByIdAsync(Id);

            rt = _mapper.Map<PhoneDto>(result);

            return rt;
        }


        [HttpDelete]
        [Route("{Id}")]
        public virtual async Task<bool> DeleteByIdAsync(int Id)
        {
            bool deleted = false;

            deleted = await _phoneRepository.DeleteAsync(Id);
            await _phoneRepository.SaveChangesAsync();
            return deleted;
        }

        [HttpGet("GetAll")]
        public virtual async Task<List<PhoneDto>> GetAllAsync()
        {
            List<PhoneDto> retorno = new List<PhoneDto>();

            var Records = await _phoneRepository.GetAllToListAsync();


            retorno = _mapper.Map<List<PhoneDto>>(Records);

            return retorno;
        }
    }
}
