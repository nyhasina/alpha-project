import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Criteria, Team, Count } from '@nicecactus-platform/graph-ql-service';
import { confirmTeamDeletion, deleteTeam, loadTeams } from '../../store/team.actions';
import { TeamState } from '../../store/team.reducers';
import { selectTeamCount, selectTeamCriteria, selectTeams, selectLoadingTeams } from '../../store/team.selectors';

@Component({
    selector: 'nicecactus-platform-team-list-root',
    templateUrl: './team-list-root.component.html',
    styleUrls: ['./team-list-root.component.scss'],
})
export class TeamListRootComponent implements OnInit {
    teams$: Observable<Team[]>;
    teamCount$: Observable<Count>;
    criteria$: Observable<Criteria<Team>>;
    loadingTeams$: Observable<boolean>;

    constructor(private teamStore: Store<TeamState>) {}

    ngOnInit() {
        this.teams$ = this.teamStore.pipe(select(selectTeams));
        this.teamCount$ = this.teamStore.pipe(select(selectTeamCount));
        this.criteria$ = this.teamStore.pipe(select(selectTeamCriteria));
        this.loadingTeams$ = this.teamStore.pipe(select(selectLoadingTeams));
    }

    onDelete(team: Team) {
        this.teamStore.dispatch(confirmTeamDeletion({ team }));
    }

    onPaginate(criteria: Criteria<Team>) {
        this.teamStore.dispatch(loadTeams({ criteria }));
    }
}
