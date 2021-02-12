import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { signIn } from '../../core/store/core.actions';
import { AppState } from '../../core/store/core.reducer';

@Component({
    selector: 'nicecactus-platform-authentication-page',
    templateUrl: './authentication-page.component.html',
    styleUrls: ['./authentication-page.component.scss'],
})
export class AuthenticationPageComponent {
    constructor(private store: Store<AppState>) {}

    onSignIn(payload: { email: string; password: string }) {
        this.store.dispatch(signIn({ ...payload }));
    }
}
