import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard, IsNotAuthenticated } from '@nicecactus-platform/guards';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'admin',
                loadChildren: () => import('./administration/administration.module').then((m) => m.AdministrationModule),
                canActivate: [IsAuthenticatedGuard],
                data: { breadcrumb: 'Administration ' },
            },
            {
                path: 'auth',
                loadChildren: () =>
                    import('./authentication-layout/authentication-layout.module').then((m) => m.AuthenticationLayoutModule),
                canActivate: [IsNotAuthenticated],
            },
            {
                path: '',
                redirectTo: 'auth',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule {}
