import { Invitation, InvitationStatus } from '../interfaces/invitation.interface';

export const now = new Date().toISOString().split('T')[0];

export const EMPTY_INVITATION: Invitation = {
    id: null,
    receiver: null,
    sender: null,
    team: null,
    date: now,
    status: InvitationStatus.PENDING,
};
