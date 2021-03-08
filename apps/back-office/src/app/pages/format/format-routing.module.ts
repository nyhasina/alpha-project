import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormatFormRootComponent } from './containers/format-form-root/format-form-root.component';
import { FormatListRootComponent } from './containers/format-list-root/format-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: FormatListRootComponent,
        children: [
            {
                path: 'edit/:formatId',
                component: FormatFormRootComponent,
                data: { breadcrumb: `Modification d'un format de tournoi` },
            },
            {
                path: 'new',
                component: FormatFormRootComponent,
                data: { breadcrumb: `Création d'un nouveau format de tournoi` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FormatRoutingModule {}
