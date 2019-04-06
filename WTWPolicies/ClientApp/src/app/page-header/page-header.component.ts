import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit, OnDestroy {

  title: string;
  private routerSub: Subscription;
  constructor(private router: Router, private titleService: Title) { }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(() => {
      this.title = this.titleService.getTitle();
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
}
