import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesComponent } from './policies/policies.component';
import { AddComponent } from './add/add.component';

//TODO: move into another file
const routes: Routes = [
    { path: '', redirectTo: '/policies', pathMatch: 'full' },
    { path: 'policies', component: PoliciesComponent },
    { path: 'add', component: AddComponent },
    {
        path: ':id/add',
        component: AddComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }