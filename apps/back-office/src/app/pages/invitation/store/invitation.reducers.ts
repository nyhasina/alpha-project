import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';
import {
  Count,
  Criteria,
  DEFAULT_CRITERIA,
  EMPTY_INVITATION,
  Invitation,
  InvitationDependencies
} from '@nicecactus-platform/graph-ql-service';
import {
  createInvitationSuccess,
  loadInvitation,
  loadInvitationFail,
  loadInvitations,
  loadInvitationsFail,
  loadInvitationsSuccess,
  loadInvitationSuccess,
  loadReceiversSuccess,
  loadSendersSuccess,
  loadTeamsAutocompletionSuccess,
  saveInvitation,
  saveInvitationFail,
  saveInvitationSuccess
} from './invitation.actions';

export interface InvitationState {
    invitations: Invitation[];
    criteria: Criteria<Invitation>;
    invitationCount: Count;
    dependencies: InvitationDependencies;
    loadingInvitations: boolean;
    invitationsLoaded: boolean;
    loadingInvitationsError?: HttpErrorResponse;
    invitation: Invitation;
    loadingInvitation: boolean;
    invitationLoaded: boolean;
    loadingInvitationError?: HttpErrorResponse;
    savingInvitation: boolean;
    invitationSaved: boolean;
    savingInvitationError?: HttpErrorResponse;
}

export const initialState: InvitationState = {
    invitations: [],
    criteria: { ...DEFAULT_CRITERIA },
    invitationCount: {
        total: 0,
    },
    dependencies: {
        teams: [],
        receivers: [],
        senders: [],
    },
    invitation: null,
    loadingInvitations: false,
    invitationsLoaded: false,
    loadingInvitation: false,
    invitationLoaded: false,
    savingInvitation: false,
    invitationSaved: false,
};

export const invitationReducer = createReducer(
    initialState,
    on(loadInvitations, (state, { criteria }) => ({ ...state, loadingInvitations: true, criteria })),
    on(loadInvitationsFail, (state, { error }) => ({
        ...state,
        loadingInvitations: false,
        invitationsLoaded: false,
        loadingInvitationsError: error,
    })),
    on(loadInvitationsSuccess, (state, { invitations, invitationCount }) => ({
        ...state,
        loadingInvitations: false,
        invitationsLoaded: true,
        invitations,
        invitationCount,
    })),
    on(createInvitationSuccess, (state, { invitation, dependencies }) => ({
        ...state,
        invitation,
        dependencies,
    })),
    on(loadInvitation, (state) => ({ ...state, loadingInvitation: true })),
    on(loadInvitationFail, (state, { error }) => ({
        ...state,
        loadingInvitation: false,
        invitationLoaded: false,
        loadingInvitationError: error,
    })),
    on(loadInvitationSuccess, (state, { invitation, dependencies }) => ({
        ...state,
        loadingInvitation: false,
        invitationLoaded: true,
        invitation,
        dependencies,
    })),
    on(saveInvitation, (state) => ({ ...state, savingInvitation: true })),
    on(saveInvitationFail, (state, { error }) => ({
        ...state,
        savingInvitation: false,
        invitationSaved: false,
        savingInvitationError: error,
    })),
    on(saveInvitationSuccess, (state, { invitation }) => ({
        ...state,
        savingInvitation: false,
        invitationSaved: false,
        invitation: EMPTY_INVITATION,
    })),
    on(loadSendersSuccess, (state, { senders }) => ({
        ...state,
        dependencies: {
            ...state.dependencies,
            senders,
        },
    })),
    on(loadReceiversSuccess, (state, { receivers }) => ({
        ...state,
        dependencies: {
            ...state.dependencies,
            receivers,
        },
    })),
    on(loadTeamsAutocompletionSuccess, (state, { teams }) => ({
        ...state,
        dependencies: {
            ...state.dependencies,
            teams,
        },
    }))
);
