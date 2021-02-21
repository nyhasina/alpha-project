import { Component, OnInit } from '@angular/core';
interface game {
  src: string,
  plateform: string
}
interface tournois {
  src: string,
  date: string,
  name: string
}
@Component({
  selector: 'nicecactus-platform-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})

export class TournamentComponent implements OnInit {
  listingGame: Array<game> =
  [{
    src: 'assets/img/liste game/a.jpg',
    plateform: 'Mobile'
  },
  {
    src: 'assets/img/liste game/clash.jpg',
    plateform: 'PC /Mobile'
  },
  {
    src: 'assets/img/liste game/fortnite.jpg',
    plateform: 'PC'
  },
  {
    src: 'assets/img/liste game/fortnite.jpg',
    plateform: 'PC'
  }];
  tournament: Array<tournois> = [
{
  src: 'assets/img/liste game/clash.jpg',
  date: 'Aujourd\'hui à 21:00:00',
  name: 'Clash Royal'
},
{
  src: 'assets/img/liste game/fortnite.jpg',
  date: 'Aujourd\'hui à 21:00:00',
  name: 'Fortnite'
},
{
  src: 'assets/img/liste game/clash.jpg',
  date: 'Aujourd\'hui à 21:00:00',
  name: 'Clash Royal'
},
{
  src: 'assets/img/liste game/fortnite.jpg',
  date: 'Aujourd\'hui à 21:00:00',
  name: 'Fortnite'
},
{
  src: 'assets/img/liste game/clash.jpg',
  date: 'Aujourd\'hui à 21:00:00',
  name: 'Clash Royal'
}]

  constructor() { }

  ngOnInit(): void {
  }

}
