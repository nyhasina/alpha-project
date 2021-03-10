import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RuleFormRootComponent } from './containers/rule-form-root/rule-form-root.component';
import { RuleListRootComponent } from './containers/rule-list-root/rule-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: RuleListRootComponent,
        children: [
            {
                path: 'edit/:ruleId',
                component: RuleFormRootComponent,
                data: { breadcrumb: `Modification d'une règle` },
            },
            {
                path: 'new',
                component: RuleFormRootComponent,
                data: { breadcrumb: `Création d'une règle` },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RuleRoutingModule {}
