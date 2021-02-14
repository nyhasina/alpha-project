import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Platform } from '@nicecactus-platform/types';
import { Observable } from 'rxjs';
import { savePlatform } from './store/platform.actions';
import { PlatformState } from './store/platform.reducers';
import { selectPlatform, selectPlatforms } from './store/platform.selectors';

@Component({
    selector: 'nicecactus-platform-platform',
    templateUrl: './platform.component.html',
    styleUrls: ['./platform.component.scss'],
})
export class PlatformComponent implements OnInit {
    platform$: Observable<Platform>;
    platforms$: Observable<Platform[]>;

    constructor(private store: Store<PlatformState>) {}

    ngOnInit() {
        this.platform$ = this.store.pipe(select(selectPlatform));
        this.platforms$ = this.store.pipe(select(selectPlatforms));
    }

    onSave(payload: Platform) {
        this.store.dispatch(savePlatform({ platform: payload }));
    }
}
