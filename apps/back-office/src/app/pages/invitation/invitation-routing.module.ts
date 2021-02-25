import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitationFormRootComponent } from './containers/invitation-form-root/invitation-form-root.component';
import { InvitationListRootComponent } from './containers/invitation-list-root/invitation-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: InvitationListRootComponent,
        children: [
            {
                path: 'edit/:invitationId',
                component: InvitationFormRootComponent,
                data: { breadcrumb: `Modification d'une équipe` },
            },
            {
                path: 'new',
                component: InvitationFormRootComponent,
                data: { breadcrumb: `Création d'une nouvelle équipe` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InvitationRoutingModule {}
