import { PolicyHolder } from './policy-holder';

export interface Policy {
    policyNumber: number;
    policyHolder: PolicyHolder;
}
