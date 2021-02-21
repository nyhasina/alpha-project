import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodeLabel, Count, Criteria } from '../..';
import { EMPTY_USER } from '../constants/user.constants';
import { User } from '../interfaces/user.interface';
import {
    CREATE_USER,
    DELETE_USER,
    LOAD_PAGINATED_USERS,
    LOAD_PAGINATED_USERS_AND_DEPENDENCIES,
    LOAD_USER_BY_ID,
    LOAD_USER_DEPENDENCIES,
    UPDATE_USER,
} from '../queries/user.queries';

@Injectable()
export class UserService {
    constructor(private apolloService: Apollo) {}

    userFactory(): Observable<User> {
        return of(EMPTY_USER);
    }

    save(payload: User): Observable<User> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateUser))
            : this.create(payload).pipe(map((response) => response.data.createUser));
    }

    create(payload: User): Observable<FetchResult<{ createUser: User }>> {
        return this.apolloService.mutate<{ createUser: User }>({
            mutation: CREATE_USER,
            variables: {
                email: payload.email,
                password: payload.password,
                firstname: payload.profile.firstname,
                lastname: payload.profile.lastname,
                username: payload.profile.username,
                language: payload.profile.language,
                currency: payload.profile.currency,
            },
        });
    }

    load(id: number): Observable<{ user: User; currencies?: CodeLabel[]; languages?: CodeLabel[] }> {
        return this.apolloService
            .query<{ user: User; currencies?: CodeLabel[]; languages?: CodeLabel[] }>({
                query: LOAD_USER_BY_ID,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }

    loadAll(criteria: Criteria<User>): Observable<{ users: User[]; userCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ users: User[]; userCount: Count }>({
                query: LOAD_PAGINATED_USERS,
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

    loadDependencies(): Observable<{ currencies: CodeLabel[]; languages: CodeLabel[] }> {
        return this.apolloService
            .query<{ users: User[]; userCount: Count; currencies: CodeLabel[]; languages: CodeLabel[] }>({
                query: LOAD_USER_DEPENDENCIES,
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }

    loadAllAndDependencies(
        criteria: Criteria<User>
    ): Observable<{ users: User[]; userCount: Count; currencies: CodeLabel[]; languages: CodeLabel[] }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ users: User[]; userCount: Count; currencies: CodeLabel[]; languages: CodeLabel[] }>({
                query: LOAD_PAGINATED_USERS_AND_DEPENDENCIES,
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

    update(payload: User): Observable<FetchResult<{ updateUser: User }>> {
        return this.apolloService.mutate<{ updateUser: User }>({
            mutation: UPDATE_USER,
            variables: {
                id: payload.id,
                email: payload.email,
                password: payload.password,
                firstname: payload.profile.firstname,
                lastname: payload.profile.lastname,
                username: payload.profile.username,
                language: payload.profile.language,
                currency: payload.profile.currency,
            },
        });
    }

    delete(id: number): Observable<User> {
        return this.apolloService
            .mutate<{ deleteUser: User }>({
                mutation: DELETE_USER,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteUser));
    }
}
