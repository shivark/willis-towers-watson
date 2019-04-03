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
        public ActionResult Get()
        {
            var model = _policyRepository.Get();
            return Ok(model);
        }

        [HttpGet("{id}")]
        public ActionResult GetById(int id)
        {
            var model = _policyRepository.GetById(id);
            return Ok(model);
        }

        [HttpPost]
        public ActionResult<Policy> Create(Policy policy)
        {
            var p = new Policy()
            {
                PolicyNumber = 0,
                PolicyHolder = new PolicyHolder()
                {
                    Name = "Shiva",
                    Age = 10,
                    Gender = Gender.Male
                }

            };
            _policyRepository.Add(policy);
            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            _policyRepository.Remove(id);
            return Ok();
        }
    }
}
