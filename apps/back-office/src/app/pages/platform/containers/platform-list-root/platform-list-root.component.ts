import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Platform } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { confirmPlatformDeletion, deletePlatform } from '../../store/platform.actions';
import { PlatformState } from '../../store/platform.reducers';
import { selectLoadingPlatforms, selectPlatforms } from '../../store/platform.selectors';

@Component({
    selector: 'nicecactus-platform-platform',
    templateUrl: './platform-list-root.component.html',
    styleUrls: ['./platform-list-root.component.scss'],
})
export class PlatformListRootComponent implements OnInit {
    platforms$: Observable<Platform[]>;
    loadingPlatforms$: Observable<boolean>;

    constructor(private platformStore: Store<PlatformState>) {}

    ngOnInit() {
        this.platforms$ = this.platformStore.pipe(select(selectPlatforms));
        this.loadingPlatforms$ = this.platformStore.pipe(select(selectLoadingPlatforms));
    }

    onDelete(platform: Platform) {
        this.platformStore.dispatch(confirmPlatformDeletion({ platform }));
    }
}
