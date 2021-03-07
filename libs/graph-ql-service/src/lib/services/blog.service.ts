import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodeLabel, Count, Criteria } from '../..';
import { EMPTY_BLOG } from '../constants/blog.constants';
import { Blog } from '../interfaces/blog.interface';
import {
    CREATE_BLOG,
    UPDATE_BLOG,
    DELETE_BLOG,
    LOAD_BLOG,
    LOAD_BLOGS
} from '../queries/blog.queries';

@Injectable()
export class BlogService {
    constructor(private apolloService: Apollo) {}

    userFactory(): Observable<Blog> {
        return of(EMPTY_BLOG);
    }

    save(payload: Blog): Observable<Blog> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateBlog))
            : this.create(payload).pipe(map((response) => response.data.createBlog));
    }

    create(payload: Blog): Observable<FetchResult<{ createBlog: Blog }>> {
        return this.apolloService.mutate<{ createBlog: Blog }>({
            mutation: CREATE_BLOG,
            variables: {
                name: payload.name,
                content: payload.content,
                cover: payload.cover,
                video: payload.video,
                isRemoved: payload.isRemoved,
            },
        });
    }

    load(id: number): Observable<{ Blog: Blog; currencies?: CodeLabel[]; languages?: CodeLabel[] }> {
        return this.apolloService
            .query<{ Blog: Blog; currencies?: CodeLabel[]; languages?: CodeLabel[] }>({
                query: LOAD_BLOG,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }
    loadAll(criteria: Criteria<Blog>): Observable<{ blogs: Blog[]; blogCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ blogs: Blog[]; blogCount: Count }>({
                query: LOAD_BLOGS,
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
    update(payload: Blog): Observable<FetchResult<{ updateBlog: Blog }>> {
        return this.apolloService.mutate<{ updateBlog: Blog }>({
            mutation: UPDATE_BLOG,
            variables: {
                id: payload.id,
                name: payload.name,
                content: payload.content,
                cover: payload.cover,
                video: payload.video,
                isRemoved: payload.isRemoved,
            },
        });
    }

    delete(id: number): Observable<Blog> {
        return this.apolloService
            .mutate<{ deleteBlog: Blog }>({
                mutation: DELETE_BLOG,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteBlog));
    }
}
