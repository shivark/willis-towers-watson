import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PoliciesComponent } from './policies/policies.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { ModalContentComponent } from './modal-content/modal-content.component';
import { DemoModalServiceStaticComponent } from './demo-modal-service-static/demo-modal-service-static.component';


@NgModule({
  declarations: [AppComponent, AppHeaderComponent, AppFooterComponent, PoliciesComponent, AddComponent, ModalContentComponent, DemoModalServiceStaticComponent],
  imports: [
    ModalModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  entryComponents: [ModalContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
