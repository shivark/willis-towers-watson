import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from './app-routing.module';
import { ModalModule } from 'ngx-bootstrap';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { PageHeaderModule } from './page-header/page-header.module';
import { PolicyModule } from './policy/policy.module';
import { HttpErrorInterceptor } from './http-error.interceptor';


@NgModule({
  declarations: [
    AppComponent],

  imports: [
    ModalModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    PageHeaderModule,
    PolicyModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
