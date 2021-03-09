import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TournamentType } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { TournamentTypeDependencies } from '../../interfaces/tournament-type-dependencies.interface';
import { saveTournamentType } from '../../store/tournament-type.actions';
import { TournamentTypeState } from '../../store/tournament-type.reducers';
import { selectTournamentType, selectTournamentTypeDependencies } from '../../store/tournament-type.selectors';

@Component({
    selector: 'nicecactus-platform-tournament-reward-form-root',
    templateUrl: './tournament-type-form-root.component.html',
    styleUrls: ['./tournament-type-form-root.component.scss'],
})
export class TournamentTypeFormRootComponent implements OnInit {
    tournamentType$: Observable<TournamentType>;
    tournamentTypeDependencies$: Observable<TournamentTypeDependencies>;

    constructor(private store: Store<TournamentTypeState>) {}

    ngOnInit() {
        this.tournamentType$ = this.store.pipe(select(selectTournamentType));
        this.tournamentTypeDependencies$ = this.store.pipe(select(selectTournamentTypeDependencies));
    }

    onSave(payload: TournamentType) {
        this.store.dispatch(saveTournamentType({ tournamentType: payload }));
    }
}
