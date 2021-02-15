import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlatformFormRootComponent } from './containers/platform-form-root/platform-form-root.component';
import { PlatformListRootComponent } from './containers/platform-list-root/platform-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformListRootComponent,
        children: [
            {
                path: 'edit/:platformId',
                component: PlatformFormRootComponent,
            },
            {
                path: 'new',
                component: PlatformFormRootComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PlatformRoutingModule {}
