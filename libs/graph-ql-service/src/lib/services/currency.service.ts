import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { CodeLabel } from '@nicecactus-platform/graph-ql-service';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import {
    CREATE_CURRENCY,
    DELETE_CURRENCY,
    LOAD_CURRENCIES,
    LOAD_CURRENCY_BY_ID,
    UPDATE_CURRENCY,
} from '../queries/currency.queries';

@Injectable()
export class CodeLabelService {
    constructor(private apolloService: Apollo) {}

    currencyFactory(): Observable<CodeLabel> {
        return of();
    }

    save(payload: CodeLabel): Observable<CodeLabel> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateCurrency))
            : this.create(payload).pipe(map((response) => response.data.createCurrency));
    }

    create(payload: CodeLabel): Observable<FetchResult<{ createCurrency: CodeLabel }>> {
        return this.apolloService.mutate<{ createCurrency: CodeLabel }>({
            mutation: CREATE_CURRENCY,
            variables: {
                code: payload.code,
                label: payload.label,
            },
        });
    }

    load(id: number): Observable<CodeLabel> {
        return this.apolloService
            .query<{ currency: CodeLabel }>({
                query: LOAD_CURRENCY_BY_ID,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data.currency));
    }

    loadAll(): Observable<CodeLabel[]> {
        return this.apolloService
            .query<{ currencys: CodeLabel[] }>({
                query: LOAD_CURRENCIES,
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data.currencys));
    }

    update(payload: CodeLabel): Observable<FetchResult<{ updateCurrency: CodeLabel }>> {
        return this.apolloService.mutate<{ updateCurrency: CodeLabel }>({
            mutation: UPDATE_CURRENCY,
            variables: {
                id: payload.id,
                code: payload.code,
                label: payload.label,
            },
        });
    }

    delete(id: number): Observable<CodeLabel> {
        return this.apolloService
            .mutate<{ deleteCodeLabel: CodeLabel }>({
                mutation: DELETE_CURRENCY,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteCodeLabel));
    }
}
