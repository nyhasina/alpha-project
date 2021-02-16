import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from '@nicecactus-platform/graph-ql-service';
import { saveGame } from '../../store/game.actions';
import { GameDependencies, GameState } from '../../store/game.reducers';
import { selectDependencies, selectGame } from '../../store/game.selectors';

@Component({
    selector: 'nicecactus-platform-game-form-root',
    templateUrl: './game-form-root.component.html',
    styleUrls: ['./game-form-root.component.scss'],
})
export class GameFormRootComponent implements OnInit {
    game$: Observable<Game>;
    dependencies$: Observable<GameDependencies>;

    constructor(private store: Store<GameState>) {}

    ngOnInit(): void {
        this.game$ = this.store.pipe(select(selectGame));
        this.dependencies$ = this.store.pipe(select(selectDependencies));
    }

    onSave(payload: Game) {
        this.store.dispatch(saveGame({ game: payload }));
    }
}
