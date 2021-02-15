import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlatformService } from '@nicecactus-platform/graph-ql-service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
    createPlatform,
    createPlatformFail,
    createPlatformSuccess,
    deletePlatform,
    deletePlatformFail,
    deletePlatformSuccess,
    loadPlatform,
    loadPlatformFail,
    loadPlatforms,
    loadPlatformsFail,
    loadPlatformsSuccess,
    loadPlatformSuccess,
    savePlatform,
    savePlatformFail,
    savePlatformSuccess,
} from './platform.actions';

@Injectable()
export class PlatformEffects {
    loadPlatforms$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPlatforms),
            switchMap(() =>
                this.platformService.loadAll().pipe(
                    map((response) => loadPlatformsSuccess({ platforms: response })),
                    catchError((error) => of(loadPlatformsFail({ error })))
                )
            )
        )
    );

    loadPlatform$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPlatform),
            switchMap(({ id }) =>
                this.platformService.load(id).pipe(
                    map((platform) => loadPlatformSuccess({ platform })),
                    catchError((error) => of(loadPlatformFail({ error })))
                )
            )
        )
    );

    deletePlatform$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deletePlatform),
            switchMap(({ id }) =>
                this.platformService.delete(id).pipe(
                    map((platform) => deletePlatformSuccess({ platform })),
                    catchError((error) => of(deletePlatformFail({ error })))
                )
            )
        )
    );

    deletePlatformSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deletePlatformSuccess),
            map(() => loadPlatforms())
        )
    );

    savePlatform$ = createEffect(() =>
        this.actions$.pipe(
            ofType(savePlatform),
            switchMap(({ platform }) =>
                this.platformService.save(platform).pipe(
                    map((response) => savePlatformSuccess({ platform: response })),
                    catchError((error) => of(savePlatformFail({ error })))
                )
            )
        )
    );

    savePlatformSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(savePlatformSuccess),
                tap(() => this.router.navigate(['/admin/platform']))
            ),
        { dispatch: false }
    );

    createPlatform$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createPlatform),
            switchMap(() =>
                this.platformService.platformFactory().pipe(
                    map((response) => createPlatformSuccess({ platform: response })),
                    catchError((error) => of(createPlatformFail({ error })))
                )
            )
        )
    );

    constructor(private actions$: Actions, private platformService: PlatformService, private router: Router) {}
}
