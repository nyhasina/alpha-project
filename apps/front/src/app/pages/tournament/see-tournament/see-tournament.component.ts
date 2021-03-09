import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nicecactus-platform-see-tournament',
  templateUrl: './see-tournament.component.html',
  styleUrls: ['./see-tournament.component.scss']
})
export class SeeTournamentComponent implements OnInit {
  menuList: Array <String> = ['Matchs', 'Règles', 'Rounds', 'Bracket', 'Participants'];
  selected: string = 'Matchs';
  constructor() { }

  ngOnInit(): void {
  }

}
