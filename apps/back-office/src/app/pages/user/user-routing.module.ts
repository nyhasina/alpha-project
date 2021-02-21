import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserFormRootComponent } from './containers/user-form-root/user-form-root.component';
import { UserListRootComponent } from './containers/user-list-root/user-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: UserListRootComponent,
        children: [
            {
                path: 'edit/:userId',
                component: UserFormRootComponent,
                data: { breadcrumb: `Modification d'un utilisateur` },
            },
            {
                path: 'new',
                component: UserFormRootComponent,
                data: { breadcrumb: `Création d'un nouveau utilisateur` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
