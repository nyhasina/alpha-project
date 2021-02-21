import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_CODE_LABEL } from '../constants/app.constants';
import {
    CREATE_LANGUAGE,
    DELETE_LANGUAGE,
    LOAD_LANGUAGE_BY_ID,
    LOAD_LANGUAGES,
    UPDATE_LANGUAGE,
} from '../queries/language.queries';

@Injectable()
export class CodeLabelService {
    constructor(private apolloService: Apollo) {}

    currencyFactory(): Observable<CodeLabel> {
        return of(EMPTY_CODE_LABEL);
    }

    save(payload: CodeLabel): Observable<CodeLabel> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateLanguage))
            : this.create(payload).pipe(map((response) => response.data.createLanguage));
    }

    create(payload: CodeLabel): Observable<FetchResult<{ createLanguage: CodeLabel }>> {
        return this.apolloService.mutate<{ createLanguage: CodeLabel }>({
            mutation: CREATE_LANGUAGE,
            variables: {
                code: payload.code,
                label: payload.label,
            },
        });
    }

    load(id: number): Observable<CodeLabel> {
        return this.apolloService
            .query<{ language: CodeLabel }>({
                query: LOAD_LANGUAGE_BY_ID,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data.language));
    }

    loadAll(): Observable<CodeLabel[]> {
        return this.apolloService
            .query<{ languages: CodeLabel[] }>({
                query: LOAD_LANGUAGES,
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data.languages));
    }

    update(payload: CodeLabel): Observable<FetchResult<{ updateLanguage: CodeLabel }>> {
        return this.apolloService.mutate<{ updateLanguage: CodeLabel }>({
            mutation: UPDATE_LANGUAGE,
            variables: {
                id: payload.id,
                code: payload.code,
                label: payload.label,
            },
        });
    }

    delete(id: number): Observable<CodeLabel> {
        return this.apolloService
            .mutate<{ deleteLanguage: CodeLabel }>({
                mutation: DELETE_LANGUAGE,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteLanguage));
    }
}
