import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nicecactus-platform-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  imagesListe: Array<string> = ["assets/img/games/apex.png","assets/img/games/auto.png", "assets/img/games/brawl.png", "assets/img/games/chess.png", "assets/img/games/clash.png", "assets/img/games/cod.png", "assets/img/games/codmobile.png", "assets/img/games/fortnite.png", "assets/img/games/hearth.png", "assets/img/games/lol.png", "assets/img/games/mariot.png", "assets/img/games/rainbow.png", "assets/img/games/RL.png", "assets/img/games/rune.png", "assets/img/games/super.png", "assets/img/games/teamFight.png", "assets/img/games/valorant.png"]
  constructor() { }

  ngOnInit(): void {
  }

}
