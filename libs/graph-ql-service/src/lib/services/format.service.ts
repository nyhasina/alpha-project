import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Count, Criteria } from '../..';
import { EMPTY_FORMAT } from '../constants/format.constants';
import { Format } from '../interfaces/format.interface';
import { Platform } from '../interfaces/platform.interface';
import { CREATE_FORMAT, DELETE_FORMAT, LOAD_FORMAT, LOAD_FORMATS, UPDATE_FORMAT } from '../queries/format.queries';

@Injectable()
export class FormatService {
    constructor(private apolloService: Apollo) {}

    formatFactory(): Observable<Format> {
        return of(EMPTY_FORMAT);
    }

    save(payload: Format): Observable<Format> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateFormat))
            : this.create(payload).pipe(map((response) => response.data.createFormat));
    }

    create(payload: Format): Observable<FetchResult<{ createFormat: Format }>> {
        return this.apolloService.mutate<{ createFormat: Format }>({
            mutation: CREATE_FORMAT,
            variables: {
                name: payload.name,
            },
        });
    }

    load(id: number): Observable<{ format: Format; platforms?: Platform[] }> {
        return this.apolloService
            .query<{ format: Format; platforms?: Platform[] }>({
                query: LOAD_FORMAT,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }

    loadAll(criteria: Criteria<Format>): Observable<{ formats: Format[]; formatCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ formats: Format[]; formatCount: Count }>({
                query: LOAD_FORMATS,
                fetchPolicy: 'no-cache',
                variables: {
                    skip: pagination.skip,
                    take: pagination.take,
                    by: sort.by,
                    direction: sort.direction,
                    search,
                },
            })
            .pipe(map((response) => response.data));
    }

    update(payload: Format): Observable<FetchResult<{ updateFormat: Format }>> {
        return this.apolloService.mutate<{ updateFormat: Format }>({
            mutation: UPDATE_FORMAT,
            variables: {
                id: payload.id,
                name: payload.name,
            },
        });
    }

    delete(id: number): Observable<Format> {
        return this.apolloService
            .mutate<{ deleteFormat: Format }>({
                mutation: DELETE_FORMAT,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteFormat));
    }
}
