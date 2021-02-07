import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorshipComponent } from './sponsorship.component';

const routes: Routes = [
    {
        path: '',
        component: SponsorshipComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class SponsorshipRoutingModule {}
