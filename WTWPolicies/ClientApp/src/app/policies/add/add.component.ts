import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PolicyService } from '../policy.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Policy } from 'src/models/policy';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit, OnDestroy {
  policyForm: FormGroup;
  errorMessage: string;
  private policy: Policy
  private routSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private policyService: PolicyService,
    private route: ActivatedRoute,
    private router: Router) { }

  get isNewPolicy(): boolean {
    return !this.policy && true;
  }

  ngOnDestroy(): void {
    this.routSubscription.unsubscribe();
  }

  ngOnInit() {
    if (this.policyForm) {
      this.policyForm.reset();
    }

    this.routSubscription = this.route.paramMap.subscribe(
      params => {
        const id = +params.get('id');
        id && this.getPolicy(id);
      }
    );

    this.policyForm = this.formBuilder.group(
      {
        name: ['', [Validators.required,
        Validators.minLength(3)]],
        age: null,
        gender: '0'
      }
    );
  }

  saveClicked(): void {
    if (this.policyForm.valid && this.isNewPolicy) {
      this.policyService.post({
        policyNumber: 0,
        policyHolder: this.policyForm.value
      })
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );;
    }

    if (this.policyForm.touched && this.policyForm.valid && !this.isNewPolicy) {
      this.policyService.update({
        policyNumber: this.policy.policyNumber,
        policyHolder: this.policyForm.value
      })
        .subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
    }
  }

  private getPolicy(id: number): void {
    this.policyService.getById(id)
      .subscribe(
        (policy: Policy) => { this.policy = policy; this.displayPolicy(); },
        (error: any) => this.errorMessage = <any>error
      );
  }

  private displayPolicy(): void {
    this.policyForm.patchValue({
      name: this.policy.policyHolder.name,
      age: this.policy.policyHolder.age,
      gender: this.policy.policyHolder.gender.toString(),
    });
  }

  private onSaveComplete() {
    this.policyForm.reset();
    this.router.navigate(['/']);
  }
}
