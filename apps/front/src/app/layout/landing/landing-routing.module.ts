import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import {LoginComponent} from './login/login.component'

const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LandingRoutingModule {}
