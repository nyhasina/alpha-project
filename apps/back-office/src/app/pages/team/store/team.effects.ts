import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TagService, TeamService, UserService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import { AppState } from '../../../core/store/core.reducer';
import { selectCurrentUser } from '../../../core/store/core.selectors';
import {
  confirmTeamDeletion,
  createTeam,
  createTeamFail,
  createTeamSuccess,
  deleteTeam,
  deleteTeamFail,
  deleteTeamSuccess,
  loadTagsAutocompletion,
  loadTagsAutocompletionFail,
  loadTagsAutocompletionSuccess,
  loadTeam,
  loadTeamDependencies,
  loadTeamDependenciesFail,
  loadTeamDependenciesSuccess,
  loadTeamFail,
  loadTeams,
  loadTeamsFail,
  loadTeamsSuccess,
  loadTeamSuccess,
  saveTeam,
  saveTeamFail,
  saveTeamSuccess
} from './team.actions';
import { TeamState } from './team.reducers';
import { selectTeamCriteria } from './team.selectors';

@Injectable()
export class TeamEffects {
    loadTeamDependencies$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTeamDependencies),
            switchMap(() =>
                this.teamService.loadDependencies().pipe(
                    map(({ users }) => loadTeamDependenciesSuccess({ dependencies: { users } })),
                    catchError((error) => of(loadTeamDependenciesFail({ error })))
                )
            )
        )
    );

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

    loadTagsAutocompletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTagsAutocompletion),
            switchMap(({ criteria }) =>
                this.tagService.loadAll(criteria).pipe(
                    map(({ tags }) => loadTagsAutocompletionSuccess({ tags })),
                    catchError((error) => of(loadTagsAutocompletionFail({ error })))
                )
            )
        )
    );

    loadTeam$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTeam),
            switchMap(({ id }) =>
                this.teamService.load(id).pipe(
                    map(({ team, users, tags }) => loadTeamSuccess({ team, dependencies: { users, tags } })),
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
            withLatestFrom(this.coreStore.pipe(select(selectCurrentUser))),
            switchMap(([{ team }, user]) =>
                this.teamService.save({ ...team, owner: user.id }).pipe(
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
                forkJoin([this.teamService.teamFactory(), this.teamService.loadDependencies()]).pipe(
                    map(([team, dependencies]) => createTeamSuccess({ team, dependencies })),
                    catchError((error) => of(createTeamFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private coreStore: Store<AppState>,
        private teamStore: Store<TeamState>,
        private dialogService: DialogService,
        private tagService: TagService,
        private teamService: TeamService,
        private userService: UserService
    ) {}
}
