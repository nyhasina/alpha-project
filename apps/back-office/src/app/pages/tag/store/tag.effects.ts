import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { TagService, PlatformService } from '@nicecactus-platform/graph-ql-service';
import { DialogService } from '@nicecactus-platform/shared';
import { forkJoin, of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { discard } from '../../../core/store/core.actions';
import {
    confirmTagDeletion,
    createTag,
    createTagFail,
    createTagSuccess,
    deleteTag,
    deleteTagFail,
    deleteTagSuccess,
    loadTag,
    loadTagFail,
    loadTags,
    loadTagsFail,
    loadTagsSuccess,
    loadTagSuccess,
    saveTag,
    saveTagFail,
    saveTagSuccess,
} from './tag.actions';
import { TagState } from './tag.reducers';
import { selectTagCriteria } from './tag.selectors';

@Injectable()
export class TagEffects {
    loadTags$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTags),
            switchMap(({ criteria }) =>
                this.tagService.loadAll(criteria).pipe(
                    map(({ tags, tagCount }) => loadTagsSuccess({ tags, tagCount })),
                    catchError((error) => of(loadTagsFail({ error })))
                )
            )
        )
    );

    loadTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadTag),
            switchMap(({ id }) =>
                this.tagService.load(id).pipe(
                    map(({ tag }) => loadTagSuccess({ tag })),
                    catchError((error) => of(loadTagFail({ error })))
                )
            )
        )
    );

    confirmTagDeletion$ = createEffect(() =>
        this.actions$.pipe(
            ofType(confirmTagDeletion),
            exhaustMap(({ tag }) => this.dialogService.openConfirmationModal({ id: tag.id, entity: tag.name })),
            map((id) => (id ? deleteTag({ id }) : discard()))
        )
    );

    deleteTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTag),
            switchMap(({ id }) =>
                this.tagService.delete(id).pipe(
                    map((tag) => deleteTagSuccess({ tag })),
                    catchError((error) => of(deleteTagFail({ error })))
                )
            )
        )
    );

    deleteTagSuccess = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteTagSuccess),
            withLatestFrom(this.tagStore.pipe(select(selectTagCriteria))),
            map(([_, criteria]) => loadTags({ criteria }))
        )
    );

    saveTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(saveTag),
            switchMap(({ tag }) =>
                this.tagService.save(tag).pipe(
                    map((response) => saveTagSuccess({ tag: response })),
                    catchError((error) => of(saveTagFail({ error })))
                )
            )
        )
    );

    saveTagSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(saveTagSuccess),
                tap(() => this.router.navigate(['/admin/tag']))
            ),
        { dispatch: false }
    );

    createTag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createTag),
            switchMap(() =>
                forkJoin([this.tagService.tagFactory(), this.platformService.loadAll()]).pipe(
                    map(([tag, platforms]) => createTagSuccess({ tag, platforms })),
                    catchError((error) => of(createTagFail({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private tagService: TagService,
        private platformService: PlatformService,
        private router: Router,
        private tagStore: Store<TagState>,
        private dialogService: DialogService
    ) {}
}
