import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Count, Criteria } from '../..';
import { EMPTY_TOURNAMENT } from '../constants/tournament.constants';
import { Tournament } from '../interfaces/tournament.interface';
import { Platform } from '../interfaces/platform.interface';
import {
    CREATE_TOURNAMENT,
    DELETE_TOURNAMENT,
    LOAD_TOURNAMENT,
    LOAD_TOURNAMENTS,
    UPDATE_TOURNAMENT,
} from '../queries/tournament.queries';

@Injectable()
export class TournamentService {
    constructor(private apolloService: Apollo) {}

    tournamentFactory(): Observable<Tournament> {
        return of(EMPTY_TOURNAMENT);
    }

    save(payload: Tournament): Observable<Tournament> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateTournament))
            : this.create(payload).pipe(map((response) => response.data.createTournament));
    }

    create(payload: Tournament): Observable<FetchResult<{ createTournament: Tournament }>> {
        return this.apolloService.mutate<{ createTournament: Tournament }>({
            mutation: CREATE_TOURNAMENT,
            variables: {
                name: payload.name,
                date: payload.date,
                closed: payload.closed,
                tournamentType: payload.tournamentType,
                format: payload.format,
                rules: payload.rules,
                rounds: payload.rounds,
                teams: payload.teams,
            },
        });
    }

    load(id: number): Observable<{ tournament: Tournament; platforms?: Platform[] }> {
        return this.apolloService
            .query<{ tournament: Tournament; platforms?: Platform[] }>({
                query: LOAD_TOURNAMENT,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }

    loadAll(criteria: Criteria<Tournament>): Observable<{ tournaments: Tournament[]; tournamentCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ tournaments: Tournament[]; tournamentCount: Count }>({
                query: LOAD_TOURNAMENTS,
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

    update(payload: Tournament): Observable<FetchResult<{ updateTournament: Tournament }>> {
        return this.apolloService.mutate<{ updateTournament: Tournament }>({
            mutation: UPDATE_TOURNAMENT,
            variables: {
                id: payload.id,
                name: payload.name,
                date: payload.date,
                closed: payload.closed,
                tournamentType: payload.tournamentType,
                format: payload.format,
                rules: payload.rules,
                rounds: payload.rounds,
                teams: payload.teams,
            },
        });
    }

    delete(id: number): Observable<Tournament> {
        return this.apolloService
            .mutate<{ deleteTournament: Tournament }>({
                mutation: DELETE_TOURNAMENT,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteTournament));
    }
}
