import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LanguageService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
    confirmLanguageDeletion,
    createLanguage,
    createLanguageFail,
    createLanguageSuccess,
    deleteLanguage,
    deleteLanguageFail,
    deleteLanguageSuccess,
    loadLanguage,
    loadLanguageFail,
    loadLanguages,
    loadLanguagesFail,
    loadLanguagesSuccess,
    loadLanguageSuccess,
    saveLanguage,
    saveLanguageFail,
    saveLanguageSuccess,
} from './language.actions';

@Injectable()
export class LanguageEffects {
    loadLanguages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadLanguages),
            switchMap(() =>
                this.languageService.loadAll().pipe(
                    map((response) => loadLanguagesSuccess({ languages: response })),
                    catchError((error) => of(loadLanguagesFail({ error })))
                )
            )
        )
    );

    loadLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadLanguage),
            switchMap(({ id }) =>
                this.languageService.load(id).pipe(
                    map((language) => loadLanguageSuccess({ language })),
                    catchError((error) => of(loadLanguageFail({ error })))
                )
            )
        )
    );

    confirmLanguageDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmLanguageDeletion),
            exhaustMap(({ language }) =>
                this.dialogService.openConfirmationModal({
                    id: language.id,
                    entity: language.label,
                })
            ),
            map((id) => (id ? deleteLanguage({ id }) : discard()))
        )
    );

    deleteLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteLanguage),
            switchMap(({ id }) =>
                this.languageService.delete(id).pipe(
                    map((language) => deleteLanguageSuccess({ language })),
                    catchError((error) => of(deleteLanguageFail({ error })))
                )
            )
        )
    );

    deleteLanguageSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteLanguageSuccess),
            map(() => loadLanguages())
        )
    );

    saveLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveLanguage),
            switchMap(({ language }) =>
                this.languageService.save(language).pipe(
                    map((response) => saveLanguageSuccess({ language: response })),
                    catchError((error) => of(saveLanguageFail({ error })))
                )
            )
        )
    );

    saveLanguageSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveLanguageSuccess),
                tap(() => this.router.navigate(['/admin/language']))
            ),
        { dispatch: false }
    );

    createLanguage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createLanguage),
            switchMap(() =>
                this.languageService.languageFactory().pipe(
                    map((response) => createLanguageSuccess({ language: response })),
                    catchError((error) => of(createLanguageFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private languageService: LanguageService,
        private dialogService: DialogService,
        private router: Router
    ) {}
}
