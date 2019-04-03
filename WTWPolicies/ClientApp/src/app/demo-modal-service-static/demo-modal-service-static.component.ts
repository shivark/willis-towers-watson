import { Component, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-service-static',
  templateUrl: './demo-modal-service-static.component.html'
})
export class DemoModalServiceStaticComponent implements OnChanges {
  modalRef: BsModalRef;
  @ViewChild('template') temp;
  @Input() display: boolean;
  @Output() confirmed = new EventEmitter<boolean>();

  constructor(private modalService: BsModalService) { }

  ngOnChanges() {
    if (this.display) {
      this.modalRef = this.modalService.show(this.temp);
    }
  }

  confirm() {
    this.confirmed.emit(true);
    this.modalRef.hide();
  }
}