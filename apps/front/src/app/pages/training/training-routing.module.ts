import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProgramRootComponent } from './containers/program-root/program-root.component';
import { SkillGamesRootComponent } from './containers/skill-games-root/skill-games-root.component';
import { StatisticRootComponent } from './containers/statistic-root/statistic-root.component';

const routes: Routes = [
    {
        path: 'program',
        component: ProgramRootComponent,
    },
    {
        path: 'skill-games',
        component: SkillGamesRootComponent,
    },
    {
        path: 'statistic',
        component: StatisticRootComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TrainingRoutingModule {}
