import { Policy } from 'src/models/policy';
import { Gender } from 'src/models/gender';

export class PolicyBuilder {
    private policyNumber = 0;
    private policyHolderName = 'name';
    private policyHolderAge = 0;
    private policyHolderGender = Gender.female;


    build(): Policy {
        return {
            policyNumber: this.policyNumber,
            policyHolder: {
                name: this.policyHolderName,
                age: this.policyHolderAge,
                gender: this.policyHolderGender
            }
        };
    }

    withPolicyNumber(policyNumber: number): PolicyBuilder {
        this.policyNumber = policyNumber;
        return this;
    }

    withPolicyHolderAge(age: number): PolicyBuilder {
        this.policyHolderAge = age;
        return this;
    }

    withPolicyHolderGender(gender: Gender): PolicyBuilder {
        this.policyHolderGender = gender;
        return this;
    }
}
