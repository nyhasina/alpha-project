import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '@nicecactus-platform/graph-ql-service';
import { saveUser } from '../../store/user.actions';
import { UserDependencies, UserState } from '../../store/user.reducers';
import { selectDependencies, selectUser } from '../../store/user.selectors';

@Component({
    selector: 'nicecactus-platform-user-form-root',
    templateUrl: './user-form-root.component.html',
    styleUrls: ['./user-form-root.component.scss'],
})
export class UserFormRootComponent implements OnInit {
    user$: Observable<User>;
    dependencies$: Observable<UserDependencies>;

    constructor(private store: Store<UserState>) {}

    ngOnInit(): void {
        this.user$ = this.store.pipe(select(selectUser));
        this.dependencies$ = this.store.pipe(select(selectDependencies));
    }

    onSave(payload: User) {
        this.store.dispatch(saveUser({ user: payload }));
    }
}
