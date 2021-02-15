import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Platform } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { go } from '../../../../core/store/core.actions';
import { AppState } from '../../../../core/store/core.reducer';
import { savePlatform } from '../../store/platform.actions';
import { PlatformState } from '../../store/platform.reducers';
import { selectPlatform, selectPlatforms } from '../../store/platform.selectors';

@Component({
    selector: 'nicecactus-platform-platform',
    templateUrl: './platform-list-root.component.html',
    styleUrls: ['./platform-list-root.component.scss'],
})
export class PlatformListRootComponent implements OnInit {
    platforms$: Observable<Platform[]>;

    constructor(private platformStore: Store<PlatformState>) {}

    ngOnInit() {
        this.platforms$ = this.platformStore.pipe(select(selectPlatforms));
    }
}
