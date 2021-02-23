import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Tag } from '@nicecactus-platform/graph-ql-service';
import { saveTag } from '../../store/tag.actions';
import { TagDependencies, TagState } from '../../store/tag.reducers';
import { selectDependencies, selectTag } from '../../store/tag.selectors';

@Component({
    selector: 'nicecactus-platform-tag-form-root',
    templateUrl: './tag-form-root.component.html',
    styleUrls: ['./tag-form-root.component.scss'],
})
export class TagFormRootComponent implements OnInit {
    tag$: Observable<Tag>;
    dependencies$: Observable<TagDependencies>;

    constructor(private store: Store<TagState>) {}

    ngOnInit(): void {
        this.tag$ = this.store.pipe(select(selectTag));
        this.dependencies$ = this.store.pipe(select(selectDependencies));
    }

    onSave(payload: Tag) {
        this.store.dispatch(saveTag({ tag: payload }));
    }
}
