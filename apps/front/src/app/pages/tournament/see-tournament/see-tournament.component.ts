import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'nicecactus-platform-see-tournament',
  templateUrl: './see-tournament.component.html',
  styleUrls: ['./see-tournament.component.scss']
})
export class SeeTournamentComponent implements OnInit {
  menuList: Array <String> = ['Matchs', 'Règles', 'Rounds', 'Bracket', 'Participants'];
  selected: string;
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.selected = this.route.url.split('/').pop()
  }

}
