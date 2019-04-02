import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppHeaderComponent } from './app-header/app-header.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { AppRoutingModule } from './app-routing.module';
import { PoliciesComponent } from './policies/policies.component';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [AppComponent, AppHeaderComponent, AppFooterComponent, PoliciesComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
