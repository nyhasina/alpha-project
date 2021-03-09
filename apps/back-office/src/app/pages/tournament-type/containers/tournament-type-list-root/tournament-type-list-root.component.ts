import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Count, Criteria, TournamentType } from '@nicecactus-platform/graph-ql-service';
import { Observable } from 'rxjs';
import { confirmTournamentTypeDeletion, loadTournamentTypes } from '../../store/tournament-type.actions';
import { TournamentTypeState } from '../../store/tournament-type.reducers';
import {
  selectLoadingTournamentTypes,
  selectTournamentTypeCount,
  selectTournamentTypeCriteria,
  selectTournamentTypes
} from '../../store/tournament-type.selectors';

@Component({
    selector: 'nicecactus-platform-tournament-type-list-root',
    templateUrl: './tournament-type-list-root.component.html',
    styleUrls: ['./tournament-type-list-root.component.scss'],
})
export class TournamentTypeListRootComponent implements OnInit {
    tournamentTypes$: Observable<TournamentType[]>;
    tournamentTypeCount$: Observable<Count>;
    criteria$: Observable<Criteria<TournamentType>>;
    loadingTournamentTypes$: Observable<boolean>;

    constructor(private tournamentTypeStore: Store<TournamentTypeState>) {}

    ngOnInit() {
        this.tournamentTypes$ = this.tournamentTypeStore.pipe(select(selectTournamentTypes));
        this.tournamentTypeCount$ = this.tournamentTypeStore.pipe(select(selectTournamentTypeCount));
        this.criteria$ = this.tournamentTypeStore.pipe(select(selectTournamentTypeCriteria));
        this.loadingTournamentTypes$ = this.tournamentTypeStore.pipe(select(selectLoadingTournamentTypes));
    }

    onDelete(tournamentType: TournamentType) {
        this.tournamentTypeStore.dispatch(confirmTournamentTypeDeletion({ tournamentType }));
    }

    onPaginate(criteria: Criteria<TournamentType>) {
        this.tournamentTypeStore.dispatch(loadTournamentTypes({ criteria }));
    }
}
