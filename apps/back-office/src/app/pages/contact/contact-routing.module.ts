import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormRootComponent } from './containers/contact-form-root/contact-form-root.component';
import { ContactListRootComponent } from './containers/contact-list-root/contact-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: ContactListRootComponent,
    },
    {
        path: 'edit/:contactId',
        component: ContactFormRootComponent,
    },
    {
        path: 'new',
        component: ContactFormRootComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContactRoutingModule {}
