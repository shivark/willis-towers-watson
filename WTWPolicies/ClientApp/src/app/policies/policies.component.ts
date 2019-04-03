import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PolicyService } from './policy.service';
import { Policy } from 'src/models/policy';
import { Gender } from 'src/models/gender';


@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  displayDeleteDialogBox: boolean;
  gender = Gender;
  policies: Policy[];
  private policyIdToDelete: number;

  constructor(private policy: PolicyService) { }

  ngOnInit() {
    this.getPolicies();
  }

  deleteClicked(id: number) {
    this.policyIdToDelete = id;
    this.displayDeleteDialogBox = true;
  }

  deleteConfirmed() {
    this.displayDeleteDialogBox = false;

    this.policy
      .delete(this.policyIdToDelete)
      .subscribe(() => this.deleteFromView(this.policies, this.policyIdToDelete));
  }

  private deleteFromView(arr: Policy[], id: number) {
    arr.splice(arr.findIndex((p: Policy) => p.policyNumber === id), 1);
  }

  private getPolicies() {
    this.policy
      .getAll()
      .subscribe(p => this.policies = p);
  }
}
