import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Platform } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { savePlatform } from '../../store/platform.actions';
import { PlatformState } from '../../store/platform.reducers';
import { selectPlatform } from '../../store/platform.selectors';

@Component({
  selector: 'nicecactus-platform-platform-form-root',
  templateUrl: './platform-form-root.component.html',
  styleUrls: ['./platform-form-root.component.scss']
})
export class PlatformFormRootComponent implements OnInit {
  platform$: Observable<Platform>;

  constructor(private store: Store<PlatformState>) {}

  ngOnInit(): void {
    this.platform$ = this.store.pipe(select(selectPlatform));
  }

  onSave(payload: Platform) {
    this.store.dispatch(savePlatform({ platform: payload }));
  }

}
