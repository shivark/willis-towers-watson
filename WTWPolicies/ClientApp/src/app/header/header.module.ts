import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppHeaderComponent } from './app-header/app-header.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';

@NgModule({
  declarations: [
    AppHeaderComponent,
    MainNavigationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppHeaderComponent
  ]
})
export class HeaderModule { }
