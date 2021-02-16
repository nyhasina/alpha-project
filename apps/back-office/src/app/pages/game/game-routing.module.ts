import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameFormRootComponent } from './containers/game-form-root/game-form-root.component';
import { GameListRootComponent } from './containers/game-list-root/game-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: GameListRootComponent,
        children: [
            {
                path: 'edit/:gameId',
                component: GameFormRootComponent,
            },
            {
                path: 'new',
                component: GameFormRootComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GameRoutingModule {}
