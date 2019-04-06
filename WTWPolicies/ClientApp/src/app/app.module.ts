import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { PoliciesComponent } from './policies/policies.component';
import { AddComponent } from './policies/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { DeleteConfirmationModalComponent } from './policies/delete-confirmation-modal/delete-confirmation-modal.component';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { PageHeaderModule } from './page-header/page-header.module';


@NgModule({
  declarations: [
    AppComponent,
    PoliciesComponent,
    AddComponent,
    DeleteConfirmationModalComponent],

  imports: [
    ModalModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HeaderModule,
    FooterModule,
    PageHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
