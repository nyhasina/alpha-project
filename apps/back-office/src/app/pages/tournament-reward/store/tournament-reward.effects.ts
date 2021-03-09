import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { PlatformService, TournamentRewardService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
  confirmTournamentRewardDeletion,
  createTournamentReward,
  createTournamentRewardFail,
  createTournamentRewardSuccess,
  deleteTournamentReward,
  deleteTournamentRewardFail,
  deleteTournamentRewardSuccess,
  loadTournamentReward,
  loadTournamentRewardFail,
  loadTournamentRewards,
  loadTournamentRewardsFail,
  loadTournamentRewardsSuccess,
  loadTournamentRewardSuccess,
  saveTournamentReward,
  saveTournamentRewardFail,
  saveTournamentRewardSuccess
} from './tournament-reward.actions';
import { TournamentRewardState } from './tournament-reward.reducers';
import { selectTournamentRewardCriteria } from './tournament-reward.selectors';

@Injectable()
export class TournamentRewardEffects {
    loadTournamentRewards$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTournamentRewards),
            switchMap(({ criteria }) =>
                this.tournamentRewardService.loadAll(criteria).pipe(
                    map(({ tournamentRewards, tournamentRewardCount }) =>
                        loadTournamentRewardsSuccess({ tournamentRewards, tournamentRewardCount })
                    ),
                    catchError((error) => of(loadTournamentRewardsFail({ error })))
                )
            )
        )
    );

    loadTournamentReward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTournamentReward),
            switchMap(({ id }) =>
                this.tournamentRewardService.load(id).pipe(
                    map(({ tournamentReward }) => loadTournamentRewardSuccess({ tournamentReward })),
                    catchError((error) => of(loadTournamentRewardFail({ error })))
                )
            )
        )
    );

    confirmTournamentRewardDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmTournamentRewardDeletion),
            exhaustMap(({ tournamentReward }) =>
                this.dialogService.openConfirmationModal({ id: tournamentReward.id, entity: tournamentReward.name })
            ),
            map((id) => (!!id ? deleteTournamentReward({ id }) : discard()))
        )
    );

    deleteTournamentReward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTournamentReward),
            switchMap(({ id }) =>
                this.tournamentRewardService.delete(id).pipe(
                    map((tournamentReward) => deleteTournamentRewardSuccess({ tournamentReward })),
                    catchError((error) => of(deleteTournamentRewardFail({ error })))
                )
            )
        )
    );

    deleteTournamentRewardSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTournamentRewardSuccess),
            withLatestFrom(this.tournamentRewardStore.pipe(select(selectTournamentRewardCriteria))),
            map(([_, criteria]) => loadTournamentRewards({ criteria }))
        )
    );

    saveTournamentReward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveTournamentReward),
            switchMap(({ tournamentReward }) =>
                this.tournamentRewardService.save(tournamentReward).pipe(
                    map((response) => saveTournamentRewardSuccess({ tournamentReward: response })),
                    catchError((error) => of(saveTournamentRewardFail({ error })))
                )
            )
        )
    );

    saveTournamentRewardSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveTournamentRewardSuccess),
                tap(() => this.router.navigate(['/admin/tournament-reward']))
            ),
        { dispatch: false }
    );

    createTournamentReward$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTournamentReward),
            switchMap(() =>
                forkJoin([this.tournamentRewardService.tournamentRewardFactory(), this.platformService.loadAll()]).pipe(
                    map(([tournamentReward, platforms]) => createTournamentRewardSuccess({ tournamentReward, platforms })),
                    catchError((error) => of(createTournamentRewardFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private tournamentRewardService: TournamentRewardService,
        private platformService: PlatformService,
        private router: Router,
        private tournamentRewardStore: Store<TournamentRewardState>,
        private dialogService: DialogService
    ) {}
}
