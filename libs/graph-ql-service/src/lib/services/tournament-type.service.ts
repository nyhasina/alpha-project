import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Count, Criteria, TournamentReward } from '../..';
//import { SortDirection } from '../../../../../../intercamsp/[angular]intercamsp/src/app/shared/interfaces/criteria.interface';
import { EMPTY_TOURNAMENT_TYPE } from '../constants/tournament-type.constants';
import { TournamentType } from '../interfaces/tournament-type.interface';
import {
  CREATE_TOURNAMENT_TYPE,
  DELETE_TOURNAMENT_TYPE,
  LOAD_TOURNAMENT_TYPE,
  LOAD_TOURNAMENT_TYPES,
  UPDATE_TOURNAMENT_TYPE
} from '../queries/tournament-type.queries';

@Injectable()
export class TournamentTypeService {
    constructor(private apolloService: Apollo) {}

    tournamentTypeFactory(): Observable<TournamentType> {
        return of(EMPTY_TOURNAMENT_TYPE);
    }

    save(payload: TournamentType): Observable<TournamentType> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateTournamentType))
            : this.create(payload).pipe(map((response) => response.data.createTournamentType));
    }

    create(payload: TournamentType): Observable<FetchResult<{ createTournamentType: TournamentType }>> {
        return this.apolloService.mutate<{ createTournamentType: TournamentType }>({
            mutation: CREATE_TOURNAMENT_TYPE,
            variables: {
                name: payload.name,
                reward: payload.reward,
            },
        });
    }

    load(id: number): Observable<{ tournamentType: TournamentType; tournamentRewards?: TournamentReward[] }> {
        return this.apolloService
            .query<{ tournamentType: TournamentType; tournamentRewards?: TournamentReward[] }>({
                query: LOAD_TOURNAMENT_TYPE,
                variables: {
                    id,
                    skip: 1,
                    take: 15,
                    by: 'id',
                    direction: SortDirection.ASC,
                    search: '',
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(
                map((response) => {
                    return response.data;
                })
            );
    }

    loadAll(criteria: Criteria<TournamentType>): Observable<{ tournamentTypes: TournamentType[]; tournamentTypeCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ tournamentTypes: TournamentType[]; tournamentTypeCount: Count }>({
                query: LOAD_TOURNAMENT_TYPES,
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

    update(payload: TournamentType): Observable<FetchResult<{ updateTournamentType: TournamentType }>> {
        return this.apolloService.mutate<{ updateTournamentType: TournamentType }>({
            mutation: UPDATE_TOURNAMENT_TYPE,
            variables: {
                id: payload.id,
                name: payload.name,
                reward: payload.reward,
            },
        });
    }

    delete(id: number): Observable<TournamentType> {
        return this.apolloService
            .mutate<{ deleteTournamentType: TournamentType }>({
                mutation: DELETE_TOURNAMENT_TYPE,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteTournamentType));
    }
}
