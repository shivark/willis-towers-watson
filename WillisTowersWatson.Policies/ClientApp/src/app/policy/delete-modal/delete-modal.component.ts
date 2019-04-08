import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { PolicyDeleteService } from '../policy-delete.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html'
})
export class DeleteModalComponent implements OnInit {
  @ViewChild('template') temp;
  @Input() policyNumber: number;
  private modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private policyDeleteService: PolicyDeleteService) {
  }

  ngOnInit(): void {
    this.policyDeleteService
      .displayDeleteModal$
      .pipe(filter(d => d && true))
      .subscribe(() => this.modalRef = this.modalService.show(this.temp));
  }

  confirm(): void {
    this.policyDeleteService.confirmDelete(true);
    this.modalRef.hide();
    this.policyDeleteService.displayModal(false);
  }

  hide(): void {
    this.modalRef.hide();
    this.policyDeleteService.confirmDelete(false);
    this.policyDeleteService.displayModal(false);
  }
}
