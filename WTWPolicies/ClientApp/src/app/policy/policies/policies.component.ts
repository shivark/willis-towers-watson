import { Component, OnInit, OnDestroy } from '@angular/core';
import { PolicyService } from '../policy.service';
import { Policy } from 'src/models/policy';
import { Gender } from 'src/models/gender';
import { Title } from '@angular/platform-browser';
import { PolicyDeleteService } from '../policy-delete.service';
import { filter, switchMap, tap, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PageTitles } from 'src/constants/page-titles';
import { ErrorMessages } from 'src/constants/error-messages';

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
    this.titleService.setTitle(PageTitles.policies);
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
        catchError(() => this.errorMessage = ErrorMessages.deletePolicy)
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
