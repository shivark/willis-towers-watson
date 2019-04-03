import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PoliciesService } from './policies.service';
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

  constructor(private policiesService: PoliciesService) { }

  ngOnInit() {
    this.policiesService
      .getAll()
      .subscribe(p => this.policies = p);
  }

  deleteClicked(id: number) {
    this.policyIdToDelete = id;
    this.displayDeleteDialogBox = true;
  }

  deleteConfirmed() {
    this.displayDeleteDialogBox = false;
    this.policiesService
      .delete(this.policyIdToDelete)
      .subscribe(() => this.deleteFromView(this.policies, this.policyIdToDelete));
  }

  private deleteFromView(arr: Policy[], id: number) {
    arr.splice(arr.findIndex((p: Policy) => p.policyNumber === id), 1);
  }
}
