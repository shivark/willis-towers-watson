import { Component, OnInit } from '@angular/core';
import { PoliciesService } from './policies.service';
import { Observable } from 'rxjs';
import { Policy } from 'src/models/policy';
import { Gender } from 'src/models/gender';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  gender = Gender;
  policies: Observable<Policy[]>;


  constructor(private policiesService: PoliciesService) { }

  ngOnInit() {
    this.policies = this.policiesService.get();
  }

  deleteClicked(id: number) {
    console.log('hello');
    this.policiesService
      .delete(id)
      .subscribe();
  }

  deleteFrom(arr: Policy[], id: number) {
    let index = arr.findIndex((x: Policy) => x.policyNumber === id);
    arr.splice(index, 1);
  }
}
