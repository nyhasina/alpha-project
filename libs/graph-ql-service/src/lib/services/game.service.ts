import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Criteria } from '../..';
import { Platform } from '../interfaces/platform.interface';
import { EMPTY_GAME } from '../constants/game.constants';
import { Game, Count } from '../interfaces/game.interface';
import { CREATE_GAME, DELETE_GAME, LOAD_GAME, LOAD_GAMES, UPDATE_GAME } from '../queries/game.queries';

@Injectable()
export class GameService {
    constructor(private apolloService: Apollo) {}

    gameFactory(): Observable<Game> {
        return of(EMPTY_GAME);
    }

    save(payload: Game): Observable<Game> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateGame))
            : this.create(payload).pipe(map((response) => response.data.createGame));
    }

    create(payload: Game): Observable<FetchResult<{ createGame: Game }>> {
        return this.apolloService.mutate<{ createGame: Game }>({
            mutation: CREATE_GAME,
            variables: {
                name: payload.name,
                coverImage: payload.coverImage,
                platforms: payload.platforms,
            },
        });
    }

    load(id: number): Observable<{ game: Game; platforms?: Platform[] }> {
        return this.apolloService
            .query<{ game: Game; platforms?: Platform[] }>({
                query: LOAD_GAME,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(
                map((response) => response.data),
                map((data) => ({
                    ...data,
                    game: { ...data.game, platforms: (data.game.platforms as Platform[]).map((item) => item.id) },
                }))
            );
    }

    loadAll(criteria: Criteria<Game>): Observable<{ games: Game[]; gameCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ games: Game[]; gameCount: Count }>({
                query: LOAD_GAMES,
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

    update(payload: Game): Observable<FetchResult<{ updateGame: Game }>> {
        return this.apolloService.mutate<{ updateGame: Game }>({
            mutation: UPDATE_GAME,
            variables: {
                id: payload.id,
                name: payload.name,
                coverImage: payload.coverImage,
                platforms: payload.platforms,
            },
        });
    }

    delete(id: number): Observable<Game> {
        return this.apolloService
            .mutate<{ deleteGame: Game }>({
                mutation: DELETE_GAME,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteGame));
    }
}
