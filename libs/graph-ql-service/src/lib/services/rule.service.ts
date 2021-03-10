import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Count, Criteria } from '../..';
import { EMPTY_RULE } from '../constants/rule.constants';
import { Rule } from '../interfaces/rule.interface';
import { Platform } from '../interfaces/platform.interface';
import { CREATE_RULE, DELETE_RULE, LOAD_RULE, LOAD_RULES, UPDATE_RULE } from '../queries/rule.queries';

@Injectable()
export class RuleService {
    constructor(private apolloService: Apollo) {}

    ruleFactory(): Observable<Rule> {
        return of(EMPTY_RULE);
    }

    save(payload: Rule): Observable<Rule> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updateRule))
            : this.create(payload).pipe(map((response) => response.data.createRule));
    }

    create(payload: Rule): Observable<FetchResult<{ createRule: Rule }>> {
        return this.apolloService.mutate<{ createRule: Rule }>({
            mutation: CREATE_RULE,
            variables: {
                name: payload.name,
                content: payload.content,
            },
        });
    }

    load(id: number): Observable<{ rule: Rule; platforms?: Platform[] }> {
        return this.apolloService
            .query<{ rule: Rule; platforms?: Platform[] }>({
                query: LOAD_RULE,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            .pipe(map((response) => response.data));
    }

    loadAll(criteria: Criteria<Rule>): Observable<{ rules: Rule[]; ruleCount: Count }> {
        const { pagination, search, sort } = criteria;
        return this.apolloService
            .query<{ rules: Rule[]; ruleCount: Count }>({
                query: LOAD_RULES,
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

    update(payload: Rule): Observable<FetchResult<{ updateRule: Rule }>> {
        return this.apolloService.mutate<{ updateRule: Rule }>({
            mutation: UPDATE_RULE,
            variables: {
                id: payload.id,
                name: payload.name,
                content: payload.content,
            },
        });
    }

    delete(id: number): Observable<Rule> {
        return this.apolloService
            .mutate<{ deleteRule: Rule }>({
                mutation: DELETE_RULE,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deleteRule));
    }
}
