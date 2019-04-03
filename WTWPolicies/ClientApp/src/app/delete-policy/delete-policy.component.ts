import { Component, Input } from '@angular/core';

@Component({
  selector: 'delete-policy',
  templateUrl: './delete-policy.component.html',
  styleUrls: ['./delete-policy.component.scss']
})
export class DeletePolicyComponent {
  @Input() policyNumber: number;
}
