import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesComponent } from './policy/policies/policies.component';
import { AddEditComponent } from './policy/add-edit/add-edit.component';
import { ROUTES } from 'src/constants/routes';

const routes: Routes = [
    { path: ROUTES.HOME, redirectTo: ROUTES.POLICIES, pathMatch: 'full' },
    { path: ROUTES.POLICIES, component: PoliciesComponent },
    { path: ROUTES.ADD, component: AddEditComponent },
    {
        path: ROUTES.EDIT,
        component: AddEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
