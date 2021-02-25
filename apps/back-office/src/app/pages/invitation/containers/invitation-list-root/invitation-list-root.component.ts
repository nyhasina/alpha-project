import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Count, Criteria, Invitation } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { confirmInvitationDeletion, loadInvitations } from '../../store/invitation.actions';
import { InvitationState } from '../../store/invitation.reducers';
import {
  selectInvitationCount,
  selectInvitationCriteria,
  selectInvitations,
  selectLoadingInvitations
} from '../../store/invitation.selectors';

@Component({
    selector: 'nicecactus-platform-invitation-list-root',
    templateUrl: './invitation-list-root.component.html',
    styleUrls: ['./invitation-list-root.component.scss'],
})
export class InvitationListRootComponent implements OnInit {
    invitations$: Observable<Invitation[]>;
    invitationCount$: Observable<Count>;
    criteria$: Observable<Criteria<Invitation>>;
    loadingInvitations$: Observable<boolean>;

    constructor(private invitationStore: Store<InvitationState>) {}

    ngOnInit() {
        this.invitations$ = this.invitationStore.pipe(select(selectInvitations));
        this.invitationCount$ = this.invitationStore.pipe(select(selectInvitationCount));
        this.criteria$ = this.invitationStore.pipe(select(selectInvitationCriteria));
        this.loadingInvitations$ = this.invitationStore.pipe(select(selectLoadingInvitations));
    }

    onDelete(invitation: Invitation) {
        this.invitationStore.dispatch(confirmInvitationDeletion({ invitation }));
    }

    onPaginate(criteria: Criteria<Invitation>) {
        this.invitationStore.dispatch(loadInvitations({ criteria }));
    }
}
