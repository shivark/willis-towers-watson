using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WTWPolicies.Data;

namespace WTWPolicies.Controllers
{
    [Route("api/policies")]
    public class PolicyController : Controller
    {
        private readonly IPolicyRepository _policyRepository;

        public PolicyController(IPolicyRepository policyRepository)
        {
            _policyRepository = policyRepository;
        }


        [HttpGet]
        public JsonResult Get()
        {
            return Json(_policyRepository.Get());
        }

        [HttpDelete]
        public void Delete(int id)
        {
            _policyRepository.Remove(id);
        }
    }
}
