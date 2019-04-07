import { Component, OnInit, OnDestroy } from '@angular/core';
import { PolicyService } from '../policy.service';
import { Policy } from 'src/models/policy';
import { Gender } from 'src/models/gender';
import { Title } from '@angular/platform-browser';
import { PolicyDeleteService } from '../policy-delete.service';
import { filter, switchMap, tap, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PAGE_TITLES } from 'src/constants/page-titles';
import { ERROR_MESSAGES } from 'src/constants/error-messages';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})

export class PoliciesComponent implements OnInit, OnDestroy {
  gender = Gender;
  policies: Policy[];
  policyNumberToDelete: number;
  errorMessage: string;
  private deleteSub: Subscription;
  private policySub: Subscription;

  constructor(
    private policyService: PolicyService,
    private titleService: Title,
    private deleteConfirmationModalService: PolicyDeleteService) { }

  ngOnInit() {
    this.titleService.setTitle(PAGE_TITLES.POLICIES);
    this.getPolicies();
    this.deleteConfirmed();
  }

  ngOnDestroy() {
    this.deleteSub.unsubscribe();
    this.policySub.unsubscribe();
  }

  deleteClicked(id: number) {
    this.policyNumberToDelete = id;
    this.deleteConfirmationModalService.displayModal(true);
  }

  deleteConfirmed() {
    this.deleteSub = this.deleteConfirmationModalService.deleteConfirmed$
      .pipe(filter(c => c && true),
        switchMap(() =>
          this.policyService.delete(this.policyNumberToDelete)
            .pipe(tap(() => this.deleteFromView(this.policies, this.policyNumberToDelete))
            )),
        catchError(() => this.errorMessage = ERROR_MESSAGES.DELETE_POLICY)
      ).subscribe();
  }

  private deleteFromView(arr: Policy[], id: number) {
    arr.splice(arr.findIndex((p: Policy) => p.policyNumber === id), 1);
  }

  private getPolicies() {
    this.policySub = this.policyService
      .getAll()
      .subscribe(p => this.policies = p);
  }
}
