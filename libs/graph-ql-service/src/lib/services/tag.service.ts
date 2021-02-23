import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodeLabel, Count, Criteria } from '../..';
import { EMPTY_TAG } from '../constants/tag.constants';
import { Tag } from '../interfaces/tag.interface';
import { CREATE_TAG, DELETE_TAG, LOAD_PAGINATED_TAGS, LOAD_TAG_BY_ID, UPDATE_TAG } from '../queries/tag.queries';

@Injectable()
export class TagService {
    constructor(private apolloService: Apollo) {}

    tagFactory(): Observable<Tag> {
        return of(EMPTY_TAG);
    }

    save(payload: Tag): Observable<Tag> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateTag))
            : this.create(payload).pipe(map((response) => response.data.createTag));
    }

    create(payload: Tag): Observable<FetchResult<{ createTag: Tag }>> {
        return this.apolloService.mutate<{ createTag: Tag }>({
            mutation: CREATE_TAG,
            variables: {
                name: payload.name,
            },
        });
    }

    load(id: number): Observable<{ tag: Tag }> {
        return this.apolloService
            .query<{ tag: Tag }>({
                query: LOAD_TAG_BY_ID,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }

    loadAll(criteria: Criteria<Tag>): Observable<{ tags: Tag[]; tagCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ tags: Tag[]; tagCount: Count }>({
                query: LOAD_PAGINATED_TAGS,
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

    update(payload: Tag): Observable<FetchResult<{ updateTag: Tag }>> {
        return this.apolloService.mutate<{ updateTag: Tag }>({
            mutation: UPDATE_TAG,
            variables: {
                id: payload.id,
                name: payload.name,
            },
        });
    }

    delete(id: number): Observable<Tag> {
        return this.apolloService
            .mutate<{ deleteTag: Tag }>({
                mutation: DELETE_TAG,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteTag));
    }
}
