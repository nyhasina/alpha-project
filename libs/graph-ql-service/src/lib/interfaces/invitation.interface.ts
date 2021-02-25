import { Team } from './team.interface';
import { User } from './user.interface';

export enum InvitationStatus {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REFUSED = 'REFUSED',
}

export const INVITATION_STATUS_LABEL: Record<InvitationStatus, string> = {
    ACCEPTED: 'Acceptée',
    REFUSED: 'Refusée',
    PENDING: 'En attente'
};
export interface Invitation {
    id?: number;
    sender?: User | number;
    receiver?: User | number;
    team?: Team | number;
    date?: string;
    status?: InvitationStatus;
}
