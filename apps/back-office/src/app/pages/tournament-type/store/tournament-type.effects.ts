import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import {
  DEFAULT_CRITERIA,
  TournamentRewardService,
  TournamentTypeService
} from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
  confirmTournamentTypeDeletion,
  createTournamentType,
  createTournamentTypeFail,
  createTournamentTypeSuccess,
  deleteTournamentType,
  deleteTournamentTypeFail,
  deleteTournamentTypeSuccess,
  loadTournamentType,
  loadTournamentTypeFail,
  loadTournamentTypes,
  loadTournamentTypesFail,
  loadTournamentTypesSuccess,
  loadTournamentTypeSuccess,
  saveTournamentType,
  saveTournamentTypeFail,
  saveTournamentTypeSuccess
} from './tournament-type.actions';
import { TournamentTypeState } from './tournament-type.reducers';
import { selectTournamentTypeCriteria } from './tournament-type.selectors';

@Injectable()
export class TournamentTypeEffects {
    loadTournamentTypes$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTournamentTypes),
            switchMap(({ criteria }) =>
                this.tournamentTypeService.loadAll(criteria).pipe(
                    map(({ tournamentTypes, tournamentTypeCount }) =>
                        loadTournamentTypesSuccess({ tournamentTypes, tournamentTypeCount })
                    ),
                    catchError((error) => of(loadTournamentTypesFail({ error })))
                )
            )
        )
    );

    loadTournamentType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTournamentType),
            switchMap(({ id }) =>
                this.tournamentTypeService.load(id).pipe(
                    map(({ tournamentType, tournamentRewards }) =>
                        loadTournamentTypeSuccess({ tournamentType, tournamentRewards })
                    ),
                    catchError((error) => of(loadTournamentTypeFail({ error })))
                )
            )
        )
    );

    confirmTournamentTypeDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmTournamentTypeDeletion),
            exhaustMap(({ tournamentType }) =>
                this.dialogService.openConfirmationModal({ id: tournamentType.id, entity: tournamentType.name })
            ),
            map((id) => (!!id ? deleteTournamentType({ id }) : discard()))
        )
    );

    deleteTournamentType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTournamentType),
            switchMap(({ id }) =>
                this.tournamentTypeService.delete(id).pipe(
                    map((tournamentType) => deleteTournamentTypeSuccess({ tournamentType })),
                    catchError((error) => of(deleteTournamentTypeFail({ error })))
                )
            )
        )
    );

    deleteTournamentTypeSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTournamentTypeSuccess),
            withLatestFrom(this.tournamentTypeStore.pipe(select(selectTournamentTypeCriteria))),
            map(([_, criteria]) => loadTournamentTypes({ criteria }))
        )
    );

    saveTournamentType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveTournamentType),
            switchMap(({ tournamentType }) =>
                this.tournamentTypeService.save(tournamentType).pipe(
                    map((response) => saveTournamentTypeSuccess({ tournamentType: response })),
                    catchError((error) => of(saveTournamentTypeFail({ error })))
                )
            )
        )
    );

    saveTournamentTypeSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveTournamentTypeSuccess),
                tap(() => this.router.navigate(['/admin/tournament-type']))
            ),
        { dispatch: false }
    );

    createTournamentType$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTournamentType),
            switchMap(() =>
                forkJoin([
                    this.tournamentTypeService.tournamentTypeFactory(),
                    this.tournamentRewardService.loadAll({
                        ...DEFAULT_CRITERIA,
                        pagination: { ...DEFAULT_CRITERIA.pagination, take: 100 },
                    }),
                ]).pipe(
                    map(([tournamentType, { tournamentRewards }]) =>
                        createTournamentTypeSuccess({ tournamentType, tournamentRewards })
                    ),
                    catchError((error) => of(createTournamentTypeFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private tournamentTypeService: TournamentTypeService,
        private tournamentRewardService: TournamentRewardService,
        private router: Router,
        private tournamentTypeStore: Store<TournamentTypeState>,
        private dialogService: DialogService
    ) {}
}
