import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { FormatService, PlatformService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
  confirmFormatDeletion,
  createFormat,
  createFormatFail,
  createFormatSuccess,
  deleteFormat,
  deleteFormatFail,
  deleteFormatSuccess,
  loadFormat,
  loadFormatFail,
  loadFormats,
  loadFormatsFail,
  loadFormatsSuccess,
  loadFormatSuccess,
  saveFormat,
  saveFormatFail,
  saveFormatSuccess
} from './format.actions';
import { FormatState } from './format.reducers';
import { selectFormatCriteria } from './format.selectors';

@Injectable()
export class FormatEffects {
    loadFormats$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadFormats),
            switchMap(({ criteria }) =>
                this.formatService.loadAll(criteria).pipe(
                    map(({ formats, formatCount }) => loadFormatsSuccess({ formats, formatCount })),
                    catchError((error) => of(loadFormatsFail({ error })))
                )
            )
        )
    );

    loadFormat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadFormat),
            switchMap(({ id }) =>
                this.formatService.load(id).pipe(
                    map(({ format, platforms }) => loadFormatSuccess({ format, platforms })),
                    catchError((error) => of(loadFormatFail({ error })))
                )
            )
        )
    );

    confirmFormatDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmFormatDeletion),
            exhaustMap(({ format }) => this.dialogService.openConfirmationModal({ id: format.id, entity: format.name })),
            map((id) => (!!id ? deleteFormat({ id }) : discard()))
        )
    );

    deleteFormat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteFormat),
            switchMap(({ id }) =>
                this.formatService.delete(id).pipe(
                    map((format) => deleteFormatSuccess({ format })),
                    catchError((error) => of(deleteFormatFail({ error })))
                )
            )
        )
    );

    deleteFormatSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteFormatSuccess),
            withLatestFrom(this.formatStore.pipe(select(selectFormatCriteria))),
            map(([_, criteria]) => loadFormats({ criteria }))
        )
    );

    saveFormat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveFormat),
            switchMap(({ format }) =>
                this.formatService.save(format).pipe(
                    map((response) => saveFormatSuccess({ format: response })),
                    catchError((error) => of(saveFormatFail({ error })))
                )
            )
        )
    );

    saveFormatSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveFormatSuccess),
                tap(() => this.router.navigate(['/admin/format']))
            ),
        { dispatch: false }
    );

    createFormat$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createFormat),
            switchMap(() =>
                forkJoin([this.formatService.formatFactory(), this.platformService.loadAll()]).pipe(
                    map(([format, platforms]) => createFormatSuccess({ format, platforms })),
                    catchError((error) => of(createFormatFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private formatService: FormatService,
        private platformService: PlatformService,
        private router: Router,
        private formatStore: Store<FormatState>,
        private dialogService: DialogService
    ) {}
}
