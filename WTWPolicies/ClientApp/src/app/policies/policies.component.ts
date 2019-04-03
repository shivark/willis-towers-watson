import { Component, OnInit } from '@angular/core';
import { PoliciesService } from './policies.service';
import { Policy } from 'src/models/policy';
import { Gender } from 'src/models/gender';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  gender = Gender;
  policies: Policy[];

  constructor(private policiesService: PoliciesService) { }

  ngOnInit() {
    this.policiesService
      .getAll()
      .subscribe(p => this.policies = p);
  }

  deleteClicked(id: number) {
    this.policiesService
      .delete(id)
      .subscribe(() => this.deleteFrom(this.policies, id));
  }

  private deleteFrom(arr: Policy[], id: number) {
    arr.splice(arr.findIndex((p: Policy) => p.policyNumber === id), 1);
  }
}
