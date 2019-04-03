using System.Collections.Generic;

namespace WTWPolicies.Data
{
    public interface IPolicyRepository
    {
        IEnumerable<Policy> Get();
        Policy GetById(int id);
        void Add(Policy policy);
        void Update(Policy policy);
        void Remove(int policyNumber);
    }
}