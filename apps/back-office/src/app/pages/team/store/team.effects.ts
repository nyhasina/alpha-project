import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TeamService, PlatformService, UserService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { DEFAULT_CRITERIA } from '../../../../../../../libs/graph-ql-service/src/lib/constants/app.constants';
import { discard } from '../../../core/store/core.actions';
import {
    confirmTeamDeletion,
    createTeam,
    createTeamFail,
    createTeamSuccess,
    deleteTeam,
    deleteTeamFail,
    deleteTeamSuccess,
    loadTeam,
    loadTeamFail,
    loadTeams,
    loadTeamsFail,
    loadTeamsSuccess,
    loadTeamSuccess,
    saveTeam,
    saveTeamFail,
    saveTeamSuccess,
} from './team.actions';
import { TeamState } from './team.reducers';
import { selectTeamCriteria } from './team.selectors';

@Injectable()
export class TeamEffects {
    loadTeams$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTeams),
            switchMap(({ criteria }) =>
                this.teamService.loadAll(criteria).pipe(
                    map(({ teams, teamCount }) => loadTeamsSuccess({ teams, teamCount })),
                    catchError((error) => of(loadTeamsFail({ error })))
                )
            )
        )
    );

    loadTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTeam),
            switchMap(({ id }) =>
                this.teamService.load(id).pipe(
                    map(({ team }) => loadTeamSuccess({ team })),
                    catchError((error) => of(loadTeamFail({ error })))
                )
            )
        )
    );

    confirmTeamDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmTeamDeletion),
            exhaustMap(({ team }) => this.dialogService.openConfirmationModal({ id: team.id, entity: team.name })),
            map((id) => (id ? deleteTeam({ id }) : discard()))
        )
    );

    deleteTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTeam),
            switchMap(({ id }) =>
                this.teamService.delete(id).pipe(
                    map((team) => deleteTeamSuccess({ team })),
                    catchError((error) => of(deleteTeamFail({ error })))
                )
            )
        )
    );

    deleteTeamSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTeamSuccess),
            withLatestFrom(this.teamStore.pipe(select(selectTeamCriteria))),
            map(([_, criteria]) => loadTeams({ criteria }))
        )
    );

    saveTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveTeam),
            switchMap(({ team }) =>
                this.teamService.save(team).pipe(
                    map((response) => saveTeamSuccess({ team: response })),
                    catchError((error) => of(saveTeamFail({ error })))
                )
            )
        )
    );

    saveTeamSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveTeamSuccess),
                tap(() => this.router.navigate(['/admin/team']))
            ),
        { dispatch: false }
    );

    createTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTeam),
            switchMap(() =>
                forkJoin([
                    this.teamService.teamFactory(),
                    this.userService.loadAll({ ...DEFAULT_CRITERIA, pagination: { ...DEFAULT_CRITERIA.pagination, take: 30 } }),
                ]).pipe(
                    map(([team, users]) => createTeamSuccess({ team, paginatedUsers: users })),
                    catchError((error) => of(createTeamFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private teamService: TeamService,
        private userService: UserService,
        private router: Router,
        private teamStore: Store<TeamState>,
        private dialogService: DialogService
    ) {}
}
