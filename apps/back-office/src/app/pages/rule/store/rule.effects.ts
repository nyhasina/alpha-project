import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { PlatformService, RuleService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
  confirmRuleDeletion,
  createRule,
  createRuleFail,
  createRuleSuccess,
  deleteRule,
  deleteRuleFail,
  deleteRuleSuccess,
  loadRule,
  loadRuleFail,
  loadRules,
  loadRulesFail,
  loadRulesSuccess,
  loadRuleSuccess,
  saveRule,
  saveRuleFail,
  saveRuleSuccess
} from './rule.actions';
import { RuleState } from './rule.reducers';
import { selectRuleCriteria } from './rule.selectors';

@Injectable()
export class RuleEffects {
    loadRules$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRules),
            switchMap(({ criteria }) =>
                this.ruleService.loadAll(criteria).pipe(
                    map(({ rules, ruleCount }) => loadRulesSuccess({ rules, ruleCount })),
                    catchError((error) => of(loadRulesFail({ error })))
                )
            )
        )
    );

    loadRule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadRule),
            switchMap(({ id }) =>
                this.ruleService.load(id).pipe(
                    map(({ rule }) => loadRuleSuccess({ rule })),
                    catchError((error) => of(loadRuleFail({ error })))
                )
            )
        )
    );

    confirmRuleDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmRuleDeletion),
            exhaustMap(({ rule }) => this.dialogService.openConfirmationModal({ id: rule.id, entity: rule.name })),
            map((id) => (id ? deleteRule({ id }) : discard()))
        )
    );

    deleteRule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRule),
            switchMap(({ id }) =>
                this.ruleService.delete(id).pipe(
                    map((rule) => deleteRuleSuccess({ rule })),
                    catchError((error) => of(deleteRuleFail({ error })))
                )
            )
        )
    );

    deleteRuleSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteRuleSuccess),
            withLatestFrom(this.ruleStore.pipe(select(selectRuleCriteria))),
            map(([_, criteria]) => loadRules({ criteria }))
        )
    );

    saveRule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveRule),
            switchMap(({ rule }) =>
                this.ruleService.save(rule).pipe(
                    map((response) => saveRuleSuccess({ rule: response })),
                    catchError((error) => of(saveRuleFail({ error })))
                )
            )
        )
    );

    saveRuleSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveRuleSuccess),
                tap(() => this.router.navigate(['/admin/rule']))
            ),
        { dispatch: false }
    );

    createRule$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createRule),
            switchMap(() =>
                forkJoin([this.ruleService.ruleFactory(), this.platformService.loadAll()]).pipe(
                    map(([rule]) => createRuleSuccess({ rule })),
                    catchError((error) => of(createRuleFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private ruleService: RuleService,
        private platformService: PlatformService,
        private router: Router,
        private ruleStore: Store<RuleState>,
        private dialogService: DialogService
    ) {}
}
