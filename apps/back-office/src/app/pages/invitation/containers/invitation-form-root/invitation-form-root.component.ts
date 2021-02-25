import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DEFAULT_CRITERIA, Invitation, InvitationDependencies } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { loadReceivers, loadSenders, loadTeamsAutocompletion, saveInvitation } from '../../store/invitation.actions';
import { InvitationState } from '../../store/invitation.reducers';
import { selectDependencies, selectInvitation } from '../../store/invitation.selectors';

@Component({
    selector: 'nicecactus-platform-invitation-form-root',
    templateUrl: './invitation-form-root.component.html',
    styleUrls: ['./invitation-form-root.component.scss'],
})
export class InvitationFormRootComponent implements OnInit {
    invitation$: Observable<Invitation>;
    dependencies$: Observable<InvitationDependencies>;

    constructor(private store: Store<InvitationState>) {}

    ngOnInit(): void {
        this.invitation$ = this.store.pipe(select(selectInvitation));
        this.dependencies$ = this.store.pipe(select(selectDependencies));
    }

    onSave(payload: Invitation) {
        this.store.dispatch(saveInvitation({ invitation: payload }));
    }

    onSearchSender(term: string) {
        this.store.dispatch(loadSenders({ criteria: { ...DEFAULT_CRITERIA, search: term || '' } }));
    }

    onSearchReceiver(term: string) {
        this.store.dispatch(loadReceivers({ criteria: { ...DEFAULT_CRITERIA, search: term || '' } }));
    }

    onSearchTeam(term: string) {
        this.store.dispatch(loadTeamsAutocompletion({ criteria: { ...DEFAULT_CRITERIA, search: term || '' } }));
    }
}
