import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { PoliciesComponent } from './policy/policies/policies.component';
import { AddEditComponent } from './policy/add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { DeleteConfirmationModalComponent } from './policy/delete-confirmation-modal/delete-confirmation-modal.component';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { PageHeaderModule } from './page-header/page-header.module';


@NgModule({
  declarations: [
    AppComponent,
    PoliciesComponent,
    AddEditComponent,
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
