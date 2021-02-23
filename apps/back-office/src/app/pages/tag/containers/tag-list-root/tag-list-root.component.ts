import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Criteria, Tag, Count } from '@nicecactus-platform/graph-ql-service';
import { confirmTagDeletion, deleteTag, loadTags } from '../../store/tag.actions';
import { TagState } from '../../store/tag.reducers';
import { selectTagCount, selectTagCriteria, selectTags, selectLoadingTags } from '../../store/tag.selectors';

@Component({
    selector: 'nicecactus-platform-tag-list-root',
    templateUrl: './tag-list-root.component.html',
    styleUrls: ['./tag-list-root.component.scss'],
})
export class TagListRootComponent implements OnInit {
    tags$: Observable<Tag[]>;
    tagCount$: Observable<Count>;
    criteria$: Observable<Criteria<Tag>>;
    loadingTags$: Observable<boolean>;

    constructor(private tagStore: Store<TagState>) {}

    ngOnInit() {
        this.tags$ = this.tagStore.pipe(select(selectTags));
        this.tagCount$ = this.tagStore.pipe(select(selectTagCount));
        this.criteria$ = this.tagStore.pipe(select(selectTagCriteria));
        this.loadingTags$ = this.tagStore.pipe(select(selectLoadingTags));
    }

    onDelete(tag: Tag) {
        this.tagStore.dispatch(confirmTagDeletion({ tag }));
    }

    onPaginate(criteria: Criteria<Tag>) {
        this.tagStore.dispatch(loadTags({ criteria }));
    }
}
