import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Platform } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { deletePlatform } from '../../store/platform.actions';
import { PlatformState } from '../../store/platform.reducers';
import { selectPlatforms } from '../../store/platform.selectors';

@Component({
  selector: 'nicecactus-platform-platform',
  templateUrl: './platform-list-root.component.html',
  styleUrls: ['./platform-list-root.component.scss']
})
export class PlatformListRootComponent implements OnInit {
  platforms$: Observable<Platform[]>;

  constructor(private platformStore: Store<PlatformState>) {
  }

  ngOnInit() {
    this.platforms$ = this.platformStore.pipe(select(selectPlatforms));
  }

  onDelete(id: number) {
    this.platformStore.dispatch(deletePlatform({ id }));
  }
}
