import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LanguageFormRootComponent } from './containers/language-form-root/language-form-root.component';
import { LanguageListRootComponent } from './containers/language-list-root/language-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: LanguageListRootComponent,
        children: [
            {
                path: 'edit/:languageId',
                component: LanguageFormRootComponent,
                data: { breadcrumb: `Modification d'une langue` },
            },
            {
                path: 'new',
                component: LanguageFormRootComponent,
                data: { breadcrumb: `Création d'une nouvelle langue` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LanguageRoutingModule {}
