import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyDeleteService {
  private display = new Subject<boolean>();
  private confirmed = new Subject<boolean>();

  displayDeleteModal$ = this.display.asObservable();
  deleteConfirmed$ = this.confirmed.asObservable();

  displayModal(display: boolean): void {
    this.display.next(display);
  }

  confirmDelete(confirmed: boolean): void {
    this.confirmed.next(confirmed);
  }
}
