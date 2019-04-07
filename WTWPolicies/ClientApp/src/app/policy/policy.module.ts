import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditComponent } from './add/add.component';
import { PoliciesComponent } from './policies/policies.component';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddEditComponent,
    PoliciesComponent,
    DeleteModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [PoliciesComponent]
})
export class PolicyModule { }
