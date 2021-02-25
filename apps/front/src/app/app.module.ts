import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { MyAccountComponent } from './pages/my-account/my-account.component';

@NgModule({
    declarations: [AppComponent, MyAccountComponent],
    imports: [BrowserModule, AppRoutingModule, CoreModule, LayoutModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
