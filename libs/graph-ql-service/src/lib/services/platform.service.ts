import { Injectable } from '@angular/core';
import { FetchResult } from '@apollo/client';
import { Apollo } from 'apollo-angular';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EMPTY_PLATFORM } from '../constants/platform.constants';
import { Platform } from '../interfaces/platform.interface';
import { CREATE_PLATFORM, DELETE_PLATFORM, LOAD_PLATFORM, LOAD_PLATFORMS, UPDATE_PLATFORM } from '../queries/platform.queries';

@Injectable()
export class PlatformService {
    constructor(private apolloService: Apollo) {}

    platformFactory(): Observable<Platform> {
        return of(EMPTY_PLATFORM);
    }

    save(payload: Platform): Observable<Platform> {
        return payload.id
            ? this.update(payload).pipe(map((response) => response.data.updatePlatform))
            : this.create(payload).pipe(map((response) => response.data.createPlatform));
    }

    create(payload: Platform): Observable<FetchResult<{ createPlatform: Platform }>> {
        return this.apolloService.mutate<{ createPlatform: Platform }>({
            mutation: CREATE_PLATFORM,
            variables: {
                name: payload.name,
                logo: payload.logo,
            },
        });
    }

    load(id: number): Observable<Platform> {
        return this.apolloService
            .query<{ platform: Platform }>({
                query: LOAD_PLATFORM,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.platform));
    }

    loadAll(): Observable<Platform[]> {
        return this.apolloService
            .query<{ platforms: Platform[] }>({
                query: LOAD_PLATFORMS,
            })
            .pipe(map((response) => response.data.platforms));
    }

    update(payload: Platform): Observable<FetchResult<{ updatePlatform: Platform }>> {
        return this.apolloService.mutate<{ updatePlatform: Platform }>({
            mutation: UPDATE_PLATFORM,
            variables: {
                name: payload.name,
                logo: payload.logo,
            },
        });
    }

    delete(id: number): Observable<Platform> {
        return this.apolloService
            .mutate<{ deletePlatform: Platform }>({
                mutation: DELETE_PLATFORM,
                variables: {
                    id,
                },
            })
            .pipe(map((response) => response.data.deletePlatform));
    }
}
