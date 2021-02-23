import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Count, Criteria } from '../..';
import { EMPTY_TEAM } from '../constants/team.constants';
import { Platform } from '../interfaces/platform.interface';
import { Team } from '../interfaces/team.interface';
import { CREATE_TEAM, DELETE_TEAM, LOAD_PAGINATED_TEAMS, LOAD_TEAM_BY_ID, UPDATE_TEAM } from '../queries/team.queries';

@Injectable()
export class TeamService {
    constructor(private apolloService: Apollo) {}

    teamFactory(): Observable<Team> {
        return of(EMPTY_TEAM);
    }

    save(payload: Team): Observable<Team> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateTeam))
            : this.create(payload).pipe(map((response) => response.data.createTeam));
    }

    create(payload: Team): Observable<FetchResult<{ createTeam: Team }>> {
        return this.apolloService.mutate<{ createTeam: Team }>({
            mutation: CREATE_TEAM,
            variables: {
                name: payload.name,
                tag: payload.tag,
                owner: payload.owner,
                members: payload.members,
            },
        });
    }

    load(id: number): Observable<{ team: Team; platforms?: Platform[] }> {
        return this.apolloService
            .query<{ team: Team }>({
                query: LOAD_TEAM_BY_ID,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }

    loadAll(criteria: Criteria<Team>): Observable<{ teams: Team[]; teamCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ teams: Team[]; teamCount: Count }>({
                query: LOAD_PAGINATED_TEAMS,
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

    update(payload: Team): Observable<FetchResult<{ updateTeam: Team }>> {
        return this.apolloService.mutate<{ updateTeam: Team }>({
            mutation: UPDATE_TEAM,
            variables: {
                id: payload.id,
                name: payload.name,
                tag: payload.tag,
                owner: payload.owner,
                members: payload.members,
            },
        });
    }

    delete(id: number): Observable<Team> {
        return this.apolloService
            .mutate<{ deleteTeam: Team }>({
                mutation: DELETE_TEAM,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteTeam));
    }
}
