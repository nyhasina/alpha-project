import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Count, Criteria } from '../..';
import { EMPTY_TOURNAMENT_REWARD } from '../constants/tournament-reward.constants';
import { TournamentReward } from '../interfaces/tournament-reward.interface';
import {
  CREATE_TOURNAMENT_REWARD,
  DELETE_TOURNAMENT_REWARD,
  LOAD_TOURNAMENT_REWARD,
  LOAD_TOURNAMENT_REWARDS,
  UPDATE_TOURNAMENT_REWARD
} from '../queries/tournament-reward.queries';

@Injectable()
export class TournamentRewardService {
    constructor(private apolloService: Apollo) {}

    tournamentRewardFactory(): Observable<TournamentReward> {
        return of(EMPTY_TOURNAMENT_REWARD);
    }

    save(payload: TournamentReward): Observable<TournamentReward> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateTournamentReward))
            : this.create(payload).pipe(map((response) => response.data.createTournamentReward));
    }

    create(payload: TournamentReward): Observable<FetchResult<{ createTournamentReward: TournamentReward }>> {
        return this.apolloService.mutate<{ createTournamentReward: TournamentReward }>({
            mutation: CREATE_TOURNAMENT_REWARD,
            variables: {
                name: payload.name,
            },
        });
    }

    load(id: number): Observable<{ tournamentReward: TournamentReward }> {
        return this.apolloService
            .query<{ tournamentReward: TournamentReward }>({
                query: LOAD_TOURNAMENT_REWARD,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }

    loadAll(
        criteria: Criteria<TournamentReward>
    ): Observable<{ tournamentRewards: TournamentReward[]; tournamentRewardCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ tournamentRewards: TournamentReward[]; tournamentRewardCount: Count }>({
                query: LOAD_TOURNAMENT_REWARDS,
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

    update(payload: TournamentReward): Observable<FetchResult<{ updateTournamentReward: TournamentReward }>> {
        return this.apolloService.mutate<{ updateTournamentReward: TournamentReward }>({
            mutation: UPDATE_TOURNAMENT_REWARD,
            variables: {
                id: payload.id,
                name: payload.name,
            },
        });
    }

    delete(id: number): Observable<TournamentReward> {
        return this.apolloService
            .mutate<{ deleteTournamentReward: TournamentReward }>({
                mutation: DELETE_TOURNAMENT_REWARD,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteTournamentReward));
    }
}
