import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PolicyService } from './policy.service';
import { Policy } from 'src/models/policy';
import { Gender } from 'src/models/gender';
import { Title } from '@angular/platform-browser';
import { PageTitles } from '../constants/page-titles';
import { DeleteConfirmationModalService } from './delete-confirmation-modal/delete-confirmation-modal.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  gender = Gender;
  policies: Policy[];
  policyNumberToDelete: number;
  displayDeleteModal$: Observable<boolean>;

  constructor(
    private policy: PolicyService,
    private titleService: Title,
    private deleteConfirmationModalService: DeleteConfirmationModalService) { }

  ngOnInit() {
    this.titleService.setTitle(PageTitles.policies);
    this.getPolicies();
    this.displayDeleteModal$ = this.deleteConfirmationModalService.displayDeleteModal$;
  }

  deleteClicked(id: number) {
    this.policyNumberToDelete = id;
    this.deleteConfirmationModalService.displayModal(true);
  }

  deleteConfirmed() {
    this.deleteConfirmationModalService.displayModal(false);

    this.policy
      .delete(this.policyNumberToDelete)
      .subscribe(() => this.deleteFromView(this.policies, this.policyNumberToDelete));
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
