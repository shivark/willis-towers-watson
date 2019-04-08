import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { PageHeaderService } from './page-header.service';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements OnInit, OnDestroy {
  title: string;
  private sub: Subscription;
  constructor(private pageHeaderService: PageHeaderService, private titleService: Title) { }

  ngOnInit(): void {
    this.sub = this.pageHeaderService.pageHeaderTitle$
      .subscribe(t => {
        this.title = t;
        this.titleService.setTitle(t);
      });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
