import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicyService } from '../policy.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Policy } from 'src/models/policy';
import { Title } from '@angular/platform-browser';
import { switchMap, map, tap, filter, catchError } from 'rxjs/operators';
import { ERROR_MESSAGES } from 'src/constants/error-messages';
import { PAGE_TITLES } from 'src/constants/page-titles';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddEditComponent implements OnInit, OnDestroy {
  policyForm: FormGroup;
  errorMessage: string;
  title: string;
  private policy: Policy
  private routSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private policyService: PolicyService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title) { }

  ngOnDestroy(): void {
    this.routSubscription.unsubscribe();
  }

  ngOnInit() {
    if (this.policyForm) {
      this.policyForm.reset();
    }
    this.initialiseForm();
    this.displayPolicy();
    this.setPageTitle();
  }

  saveClicked(): void {
    if (!this.policyForm.valid || !this.policyForm.touched) {
      return;
    }

    this.policyService.save({
      policyNumber: this.policy.policyNumber || 0,
      policyHolder: this.policyForm.value
    }).subscribe(
      () => this.onSaveComplete(),
      () => this.errorMessage = ERROR_MESSAGES.SAVE_POLICY);
  }

  isInValid(input): boolean {
    return (this.policyForm.get(input).touched ||
      this.policyForm.get(input).dirty) &&
      !this.policyForm.get(input).valid
  }

  private displayPolicy() {
    this.routSubscription = this.route.paramMap.pipe(
      map(params => +params.get('id')),
      switchMap(id => this.policyService.getById(id)
        .pipe(
          filter(p => p && true),
          tap(p => this.policy = p),
          tap(this.policyForm.patchValue))),
      catchError(() => this.errorMessage = ERROR_MESSAGES.SAVE_POLICY
      ))
      .subscribe();
  }

  private setPageTitle() {
    this.titleService.setTitle(this.policy ? PAGE_TITLES.EDIT : PAGE_TITLES.ADD);
  }

  private initialiseForm() {
    this.policyForm = this.formBuilder.group(
      {
        name: ['', [Validators.required,
        Validators.minLength(3)]],
        age: null,
        gender: '0'
      }
    );
  }

  private onSaveComplete() {
    this.policyForm.reset();
    this.router.navigate(['/']);
  }
}
