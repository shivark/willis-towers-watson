import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PolicyService } from "../policy.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Policy } from "src/models/policy";
import { switchMap, map, tap, filter, catchError } from "rxjs/operators";
import { ERROR_MESSAGES } from "src/constants/error-messages";
import { PageHeaderService } from 'src/app/page-header/page-header.service';
import { PAGE_TITLES } from 'src/constants/page-titles';
import { Gender } from 'src/models/gender';

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.scss"]
})
export class AddEditComponent implements OnInit, OnDestroy {
  policyForm: FormGroup;
  errorMessage: string;
  title: string;
  private policy: Policy;
  private policySub: Subscription;
  private saveSub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private policyService: PolicyService,
    private route: ActivatedRoute,
    private router: Router,
    private pageHeaderService: PageHeaderService
  ) { }

  ngOnDestroy(): void {
    this.policySub.unsubscribe();
    this.saveSub.unsubscribe();
  }

  ngOnInit() {
    if (this.policyForm) {
      this.policyForm.reset();
    }
    this.setUpForm();
    this.policySub = this.initialiseFormWithPolicy().subscribe();
  }

  saveClicked(): void {
    if (!this.policyForm.valid || !this.policyForm.touched) {
      return;
    }

    this.saveSub = this.policyService
      .save(this.mapFormToPolicy())
      .subscribe(
        () => this.onSaveComplete(),
        () => (this.errorMessage = ERROR_MESSAGES.SAVE_POLICY)
      );
  }

  isInValid(input): boolean {
    return (
      (this.policyForm.get(input).touched ||
        this.policyForm.get(input).dirty) &&
      !this.policyForm.get(input).valid
    );
  }

  private initialiseFormWithPolicy() {
    return this.route.paramMap
      .pipe(
        map(params => +params.get("id")),
        switchMap(id =>
          this.policyService.getById(id).pipe(
            tap(p => this.setHeaderTitle(p)),
            filter(p => p && true),
            tap(p => (this.policy = p)),
            tap(p => this.mapPolicyToForm(p))
          )
        ),
        catchError(() => (this.errorMessage = ERROR_MESSAGES.SAVE_POLICY)));
  }

  private setHeaderTitle(policy: Policy) {
    var title = policy ? PAGE_TITLES.EDIT : PAGE_TITLES.ADD;
    this.pageHeaderService.setHeaderTitle(title);
  }

  private setUpForm() {
    this.policyForm = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
      age: null,
      gender: "0"
    });
  }

  private mapPolicyToForm(policy: Policy) {
    this.policyForm.patchValue({
      name: policy.policyHolder.name,
      age: policy.policyHolder.age,
      gender: policy.policyHolder.gender.toString()
    })
  }

  private mapFormToPolicy(): Policy {
    return {
      policyNumber: this.policy ? this.policy.policyNumber : 0,
      policyHolder: this.policyForm.value
    }
  }

  private onSaveComplete() {
    this.policyForm.reset();
    this.router.navigate(["/"]);
  }
}
