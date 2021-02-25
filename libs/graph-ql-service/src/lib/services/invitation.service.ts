import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_INVITATION } from '../constants/invitation.constants';
import { Criteria } from '../interfaces/criteria.interface';
import { Count } from '../interfaces/game.interface';
import { Invitation } from '../interfaces/invitation.interface';
import { Team } from '../interfaces/team.interface';
import { User } from '../interfaces/user.interface';
import {
  CREATE_INVITATION,
  DELETE_INVITATION,
  LOAD_INVITATION_BY_ID,
  LOAD_INVITATION_DEPENDENCIES,
  LOAD_PAGINATED_INVITATIONS,
  UPDATE_INVITATION
} from '../queries/invitation.queries';

export interface InvitationDependencies {
    senders?: User[];
    receivers?: User[];
    teams?: Team[];
}

@Injectable()
export class InvitationService {
    constructor(private apolloService: Apollo) {}

    invitationFactory(): Observable<Invitation> {
        return of(EMPTY_INVITATION);
    }

    save(payload: Invitation): Observable<Invitation> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateInvitation))
            : this.create(payload).pipe(map((response) => response.data.createInvitation));
    }

    create(payload: Invitation): Observable<FetchResult<{ createInvitation: Invitation }>> {
        return this.apolloService.mutate<{ createInvitation: Invitation }>({
            mutation: CREATE_INVITATION,
            variables: {
                sender: payload.sender,
                receiver: payload.receiver,
                team: payload.team,
                date: payload.date,
                status: payload.status,
            },
        });
    }

    load(id: number): Observable<{ invitation: Invitation; senders?: User[]; receivers?: User[]; teams?: Team[] }> {
        return this.apolloService
            .query<{ invitation: Invitation; senders?: User[]; receivers?: User[]; teams?: Team[] }>({
                query: LOAD_INVITATION_BY_ID,
                variables: {
                    id,
                    skip: 1,
                    take: 30,
                    by: 'id',
                    direction: 'asc',
                    search: '',
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }

    loadAll(criteria: Criteria<Invitation>): Observable<{ invitations: Invitation[]; invitationCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ invitations: Invitation[]; invitationCount: Count }>({
                query: LOAD_PAGINATED_INVITATIONS,
                fetchPolicy: 'no-cache',
                variables: {
                    skip: pagination.skip,
                    take: pagination.take,
                    by: sort.by,
                    direction: sort.direction,
                    search,
                },
            })
            .pipe(map((response) => response.data));
    }

    update(payload: Invitation): Observable<FetchResult<{ updateInvitation: Invitation }>> {
        return this.apolloService.mutate<{ updateInvitation: Invitation }>({
            mutation: UPDATE_INVITATION,
            variables: {
                id: payload.id,
                sender: payload.sender,
                receiver: payload.receiver,
                team: payload.team,
                date: payload.date,
                status: payload.status,
            },
        });
    }

    delete(id: number): Observable<Invitation> {
        return this.apolloService
            .mutate<{ deleteInvitation: Invitation }>({
                mutation: DELETE_INVITATION,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteInvitation));
    }

    loadDependencies(): Observable<InvitationDependencies> {
        return this.apolloService
            .query<InvitationDependencies>({
                query: LOAD_INVITATION_DEPENDENCIES,
                fetchPolicy: 'no-cache',
                variables: {
                    skip: 1,
                    take: 30,
                    by: 'id',
                    direction: 'asc',
                    search: '',
                },
            })
            .pipe(map((response) => response.data));
    }
}
