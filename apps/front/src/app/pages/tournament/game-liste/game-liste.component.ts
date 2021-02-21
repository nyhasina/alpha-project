import { Component, OnInit } from '@angular/core';
interface game {
  src: string,
  plateform: Array<string>,
  name: string
}
@Component({
  selector: 'nicecactus-platform-game-liste',
  templateUrl: './game-liste.component.html',
  styleUrls: ['./game-liste.component.scss', '../tournament.component.scss']
})
export class GameListeComponent implements OnInit {
  gameList: Array<game> = [{
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Clash Royal'
    },
    {
      src: 'assets/img/liste game/fortnite.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Fortnite'
    },
    {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Clash Royal'
    },
    {
      src: 'assets/img/liste game/fortnite.jpg',
      plateform: ['PC', 'PS4', 'Mobile', 'PS5', 'XBOX'],
      name: 'Fortnite'
    },
    {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4', 'Mobile', 'PS5', 'XBOX Serie'],
      name: 'Clash Royal'
    }, {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Clash Royal'
    },
    {
      src: 'assets/img/liste game/fortnite.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Fortnite'
    },
    {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Clash Royal'
    },
    {
      src: 'assets/img/liste game/fortnite.jpg',
      plateform: ['PC', 'PS4', 'Mobile', 'PS5', 'XBOX'],
      name: 'Fortnite'
    },
    {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4', 'Mobile', 'PS5', 'XBOX Serie'],
      name: 'Clash Royal'
    }, {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Clash Royal'
    },
    {
      src: 'assets/img/liste game/fortnite.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Fortnite'
    },
    {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Clash Royal'
    },
    {
      src: 'assets/img/liste game/fortnite.jpg',
      plateform: ['PC', 'PS4', 'Mobile', 'PS5', 'XBOX'],
      name: 'Fortnite'
    },
    {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4', 'Mobile', 'PS5', 'XBOX Serie'],
      name: 'Clash Royal'
    }, {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Clash Royal'
    },
    {
      src: 'assets/img/liste game/fortnite.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Fortnite'
    },
    {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4'],
      name: 'Clash Royal'
    },
    {
      src: 'assets/img/liste game/fortnite.jpg',
      plateform: ['PC', 'PS4', 'Mobile', 'PS5', 'XBOX'],
      name: 'Fortnite'
    },
    {
      src: 'assets/img/liste game/clash.jpg',
      plateform: ['PC', 'PS4', 'Mobile', 'PS5', 'XBOX Serie'],
      name: 'Clash Royal'
    }]
  constructor() { }

  ngOnInit(): void {
  }

}
