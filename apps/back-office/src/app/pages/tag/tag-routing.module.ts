import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TagFormRootComponent } from './containers/tag-form-root/tag-form-root.component';
import { TagListRootComponent } from './containers/tag-list-root/tag-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: TagListRootComponent,
        children: [
            {
                path: 'edit/:gameId',
                component: TagFormRootComponent,
                data: { breadcrumb: `Modification d'un jeu` },
            },
            {
                path: 'new',
                component: TagFormRootComponent,
                data: { breadcrumb: `Création d'un nouveau jeu` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TagRoutingModule {}
