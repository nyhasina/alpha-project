import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Criteria, Game, GameCount } from '@nicecactus-platform/graph-ql-service';
import { deleteGame, loadGames } from '../../store/game.actions';
import { GameState } from '../../store/game.reducers';
import { selectGameCount, selectGameCriteria, selectGames } from '../../store/game.selectors';

@Component({
    selector: 'nicecactus-platform-game-list-root',
    templateUrl: './game-list-root.component.html',
    styleUrls: ['./game-list-root.component.scss'],
})
export class GameListRootComponent implements OnInit {
    games$: Observable<Game[]>;
    gameCount$: Observable<GameCount>;
    criteria$: Observable<Criteria<Game>>;

    constructor(private gameStore: Store<GameState>) {}

    ngOnInit() {
        this.games$ = this.gameStore.pipe(select(selectGames));
        this.gameCount$ = this.gameStore.pipe(select(selectGameCount));
        this.criteria$ = this.gameStore.pipe(select(selectGameCriteria));
    }

    onDelete(id: number) {
        this.gameStore.dispatch(deleteGame({ id }));
    }

    onPaginate(criteria: Criteria<Game>) {
        this.gameStore.dispatch(loadGames({ criteria }));
    }
}
