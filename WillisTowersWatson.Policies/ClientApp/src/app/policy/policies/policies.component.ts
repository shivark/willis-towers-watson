import { Component, OnInit, OnDestroy } from '@angular/core';
import { PolicyService } from '../policy.service';
import { Policy } from 'src/models/policy';
import { PolicyDeleteService } from '../policy-delete.service';
import { filter, switchMap, tap, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PAGE_TITLES } from 'src/constants/page-titles';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { PageHeaderService } from 'src/app/page-header/page-header.service';
import { Gender } from 'src/models/gender';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})

export class PoliciesComponent implements OnInit, OnDestroy {
  policies: Policy[];
  policyToDel: number;
  errorMessage: string;
  gender = Gender;
  private deleteSub: Subscription;
  private policySub: Subscription;

  constructor(
    private policyService: PolicyService,
    private pageHeaderService: PageHeaderService,
    private policyDeleteService: PolicyDeleteService) { }

  ngOnInit(): void {
    this.pageHeaderService.setHeaderTitle(PAGE_TITLES.POLICIES);
    this.getPolicies();
    this.deleteOnConfirmed();
  }

  ngOnDestroy(): void {
    this.deleteSub.unsubscribe();
    this.policySub.unsubscribe();
  }

  deleteClicked(id: number): void {
    this.policyToDel = id;
    this.policyDeleteService.displayModal(true);
  }

  deleteOnConfirmed(): void {
    this.deleteSub = this.policyDeleteService.deleteConfirmed$
      .pipe(
        filter(confirmed => confirmed),
        switchMap(() =>
          this.policyService.delete(this.policyToDel)
            .pipe(tap(() => this.deleteFromView(this.policies, this.policyToDel))
            )),
        catchError(() => this.errorMessage = ERROR_MESSAGES.DELETE_POLICY)
      ).subscribe();
  }

  private deleteFromView(arr: Policy[], id: number): void {
    arr.splice(arr.findIndex((p: Policy) => p.policyNumber === id), 1);
  }

  private getPolicies(): void {
    this.policySub = this.policyService
      .getAll()
      .subscribe(p => this.policies = p);
  }
}
