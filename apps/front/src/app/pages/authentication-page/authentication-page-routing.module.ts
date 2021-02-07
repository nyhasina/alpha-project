import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRootComponent } from './containers/login-root/login-root.component';
import { RegisterRootComponent } from './containers/register-root/register-root.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginRootComponent,
    },
    {
        path: 'register',
        component: RegisterRootComponent,
    },
    {
        path: '',
        redirectTo: '*',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AuthenticationPageRoutingModule {}
