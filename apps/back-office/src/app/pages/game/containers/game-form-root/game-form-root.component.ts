import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from '@nicecactus-platform/graph-ql-service';
import { saveGame } from '../../store/game.actions';
import { GameState } from '../../store/game.reducers';
import { selectGame } from '../../store/game.selectors';

@Component({
    selector: 'nicecactus-platform-game-form-root',
    templateUrl: './game-form-root.component.html',
    styleUrls: ['./game-form-root.component.scss'],
})
export class GameFormRootComponent implements OnInit {
    game$: Observable<Game>;

    constructor(private store: Store<GameState>) {}

    ngOnInit(): void {
        this.game$ = this.store.pipe(select(selectGame));
    }

    onSave(payload: Game) {
        this.store.dispatch(saveGame({ game: payload }));
    }
}
