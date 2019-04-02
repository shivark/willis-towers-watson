import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliciesComponent } from './policies/policies.component';

const routes: Routes = [
    { path: '', redirectTo: '/policies', pathMatch: 'full' },
    { path: 'policies', component: PoliciesComponent },
    //   { path: 'detail/:id', component: HeroDetailComponent },
    //   { path: 'heroes', component: HeroesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }