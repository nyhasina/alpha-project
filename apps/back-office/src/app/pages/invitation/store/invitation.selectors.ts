import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvitationState } from './invitation.reducers';

export const selectInvitationState = createFeatureSelector<InvitationState>('invitation');
export const selectInvitations = createSelector(selectInvitationState, (state: InvitationState) => state.invitations);
export const selectInvitationCriteria = createSelector(selectInvitationState, (state: InvitationState) => state.criteria);
export const selectLoadingInvitations = createSelector(
    selectInvitationState,
    (state: InvitationState) => state.loadingInvitations
);
export const selectInvitationsLoaded = createSelector(selectInvitationState, (state: InvitationState) => state.invitationsLoaded);
export const selectLoadingInvitationsError = createSelector(
    selectInvitationState,
    (state: InvitationState) => state.loadingInvitationsError
);
export const selectInvitation = createSelector(selectInvitationState, (state: InvitationState) => state.invitation);
export const selectLoadingInvitation = createSelector(selectInvitationState, (state: InvitationState) => state.loadingInvitation);
export const selectInvitationLoaded = createSelector(selectInvitationState, (state: InvitationState) => state.invitationLoaded);
export const selectLoadingInvitationError = createSelector(
    selectInvitationState,
    (state: InvitationState) => state.loadingInvitationError
);
export const selectDependencies = createSelector(selectInvitationState, (state: InvitationState) => state.dependencies);
export const selectInvitationCount = createSelector(selectInvitationState, (state: InvitationState) => state.invitationCount);
