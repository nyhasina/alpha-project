import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Game } from '@nicecactus-platform/graph-ql-service';
import { deleteGame } from '../../store/game.actions';
import { GameState } from '../../store/game.reducers';
import { selectGames } from '../../store/game.selectors';

@Component({
    selector: 'nicecactus-platform-game-list-root',
    templateUrl: './game-list-root.component.html',
    styleUrls: ['./game-list-root.component.scss'],
})
export class GameListRootComponent implements OnInit {
    games$: Observable<Game[]>;

    constructor(private gameStore: Store<GameState>) {}

    ngOnInit() {
        this.games$ = this.gameStore.pipe(select(selectGames));
    }

    onDelete(id: number) {
        this.gameStore.dispatch(deleteGame({ id }));
    }
}
