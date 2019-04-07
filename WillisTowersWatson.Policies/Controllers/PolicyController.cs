using Microsoft.AspNetCore.Mvc;
using WTWPolicies.Data;


namespace WTWPolicies.Controllers
{
    //[Route("api/[controller]")]
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
        public ActionResult<Policy> Create([FromBody]Policy policy)
        {
            _policyRepository.Add(policy);
            return Ok();
        }

        [HttpPut]
        public ActionResult<Policy> Update([FromBody]Policy policy)
        {
            _policyRepository.Update(policy);
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
