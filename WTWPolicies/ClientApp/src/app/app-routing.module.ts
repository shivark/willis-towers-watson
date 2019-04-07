import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesComponent } from './policy/policies/policies.component';
import { AddEditComponent } from './policy/add/add.component';

const routes: Routes = [
    { path: '', redirectTo: '/policies', pathMatch: 'full' },
    { path: 'policies', component: PoliciesComponent },
    { path: 'add', component: AddEditComponent },
    {
        path: 'edit/:id',
        component: AddEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }