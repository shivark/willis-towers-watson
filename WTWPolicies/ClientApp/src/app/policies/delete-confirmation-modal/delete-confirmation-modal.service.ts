import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteConfirmationModalService {
  private display = new Subject<boolean>();

  displayDeleteModal$ = this.display.asObservable();

  displayModal(display: boolean) {
    this.display.next(display);
  }
}
