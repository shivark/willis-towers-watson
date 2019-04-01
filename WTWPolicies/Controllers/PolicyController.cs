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


        //TODO add methods to get/create/update/delete data from _repository
        public JsonResult Get()
        {
            return Json(_policyRepository.Get());
        }
    }
}
