import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrencyFormRootComponent } from './containers/currency-form-root/currency-form-root.component';
import { CurrencyListRootComponent } from './containers/currency-list-root/currency-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: CurrencyListRootComponent,
        children: [
            {
                path: 'edit/:currencyId',
                component: CurrencyFormRootComponent,
                data: { breadcrumb: `Modification d'une devise` },
            },
            {
                path: 'new',
                component: CurrencyFormRootComponent,
                data: { breadcrumb: `Création d'une nouvelle devise` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CurrencyRoutingModule {}
