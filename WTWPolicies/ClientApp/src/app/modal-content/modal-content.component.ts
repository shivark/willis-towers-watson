import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'modal-content',
  templateUrl: './modal-content.component.html',
})

export class ModalContentComponent {
  title: string;
  closeBtnName: string;
  policyNumber: number;

  constructor(public bsModalRef: BsModalRef) { }

}