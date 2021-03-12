import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { PlatformService, TournamentService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
  confirmTournamentDeletion,
  createTournament,
  createTournamentFail,
  createTournamentSuccess,
  deleteTournament,
  deleteTournamentFail,
  deleteTournamentSuccess,
  loadTournament,
  loadTournamentFail,
  loadTournaments,
  loadTournamentsFail,
  loadTournamentsSuccess,
  loadTournamentSuccess,
  saveTournament,
  saveTournamentFail,
  saveTournamentSuccess
} from './tournament.actions';
import { TournamentState } from './tournament.reducers';
import { selectTournamentCriteria } from './tournament.selectors';

@Injectable()
export class TournamentEffects {
    loadTournaments$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTournaments),
            switchMap(({ criteria }) =>
                this.tournamentService.loadAll(criteria).pipe(
                    map(({ tournaments, tournamentCount }) => loadTournamentsSuccess({ tournaments, tournamentCount })),
                    catchError((error) => of(loadTournamentsFail({ error })))
                )
            )
        )
    );

    loadTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTournament),
            switchMap(({ id }) =>
                this.tournamentService.load(id).pipe(
                    map(({ tournament, platforms }) => loadTournamentSuccess({ tournament, platforms })),
                    catchError((error) => of(loadTournamentFail({ error })))
                )
            )
        )
    );

    confirmTournamentDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmTournamentDeletion),
            exhaustMap(({ tournament }) => this.dialogService.openConfirmationModal({ id: tournament.id, entity: tournament.name })),
            map((id) => (!!id ? deleteTournament({ id }) : discard()))
        )
    );

    deleteTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTournament),
            switchMap(({ id }) =>
                this.tournamentService.delete(id).pipe(
                    map((tournament) => deleteTournamentSuccess({ tournament })),
                    catchError((error) => of(deleteTournamentFail({ error })))
                )
            )
        )
    );

    deleteTournamentSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTournamentSuccess),
            withLatestFrom(this.tournamentStore.pipe(select(selectTournamentCriteria))),
            map(([_, criteria]) => loadTournaments({ criteria }))
        )
    );

    saveTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveTournament),
            switchMap(({ tournament }) =>
                this.tournamentService.save(tournament).pipe(
                    map((response) => saveTournamentSuccess({ tournament: response })),
                    catchError((error) => of(saveTournamentFail({ error })))
                )
            )
        )
    );

    saveTournamentSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveTournamentSuccess),
                tap(() => this.router.navigate(['/admin/tournament']))
            ),
        { dispatch: false }
    );

    createTournament$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTournament),
            switchMap(() =>
                forkJoin([this.tournamentService.tournamentFactory(), this.platformService.loadAll()]).pipe(
                    map(([tournament, platforms]) => createTournamentSuccess({ tournament, platforms })),
                    catchError((error) => of(createTournamentFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private tournamentService: TournamentService,
        private platformService: PlatformService,
        private router: Router,
        private tournamentStore: Store<TournamentState>,
        private dialogService: DialogService
    ) {}
}
