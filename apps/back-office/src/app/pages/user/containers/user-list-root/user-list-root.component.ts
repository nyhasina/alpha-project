import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Criteria, User, Count } from '@nicecactus-platform/graph-ql-service';
import { confirmUserDeletion, deleteUser, loadUsers } from '../../store/user.actions';
import { UserState } from '../../store/user.reducers';
import { selectUserCount, selectUserCriteria, selectUsers, selectLoadingUsers } from '../../store/user.selectors';

@Component({
    selector: 'nicecactus-platform-user-list-root',
    templateUrl: './user-list-root.component.html',
    styleUrls: ['./user-list-root.component.scss'],
})
export class UserListRootComponent implements OnInit {
    users$: Observable<User[]>;
    userCount$: Observable<Count>;
    criteria$: Observable<Criteria<User>>;
    loadingUsers$: Observable<boolean>;

    constructor(private userStore: Store<UserState>) {}

    ngOnInit() {
        this.users$ = this.userStore.pipe(select(selectUsers));
        this.userCount$ = this.userStore.pipe(select(selectUserCount));
        this.criteria$ = this.userStore.pipe(select(selectUserCriteria));
        this.loadingUsers$ = this.userStore.pipe(select(selectLoadingUsers));
    }

    onDelete(user: User) {
        this.userStore.dispatch(confirmUserDeletion({ user }));
    }

    onPaginate(criteria: Criteria<User>) {
        this.userStore.dispatch(loadUsers({ criteria }));
    }
}
