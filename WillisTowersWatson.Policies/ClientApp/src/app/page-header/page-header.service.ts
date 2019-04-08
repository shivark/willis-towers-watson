import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageHeaderService {

  private headerTitle = new Subject<string>();

  pageHeaderTitle$ = this.headerTitle.asObservable();

  setHeaderTitle(title: string): void {
    this.headerTitle.next(title);
  }
}
