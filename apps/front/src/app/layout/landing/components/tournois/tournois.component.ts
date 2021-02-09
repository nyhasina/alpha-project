import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nicecactus-platform-tournois',
  templateUrl: './tournois.component.html',
  styleUrls: ['./tournois.component.scss']
})
export class TournoisComponent implements OnInit {
// eslint-disable-next-line max-len
gamesList: Array<string> = ['Apex legends', 'Auto Chess', 'Brawl Stars', 'Brawlhalla', 'Call Of Duty Cold War', 'Call of duty Mobile', 'Call of duty Modern warfare', ' Clash royal', 'FIFA 21', 'Fortnite', 'Hearthstone', 'Legends of Runeterra', 'LOL', 'Mario kart tour', 'Rocket League', 'Rogue Company', 'Super Smash Bros. Ultimate', 'TFT', 'Tom Clancy\'s Rainbow Six: Siege', 'Valorant', ' Wild Rift'];
gameCalendar: Array<any> = [
  {
    name: 'Apex Legends Top Dégâts',
    logo:'assets/img/brand/ps.png',
    prize: '3£',
    date: '02/09/2021, 9:44 PM'
  },
  {
    name: 'Apex Legends Top Dégâts',
    logo:'assets/img/brand/ps.png',
    prize: '3£',
    date: '02/09/2021, 9:44 PM'
  },
  {
    name: 'Apex Legends Top Dégâts',
    logo:'assets/img/brand/ps.png',
    prize: '3£',
    date: '02/09/2021, 9:44 PM'
  }
]
  constructor() { }

  ngOnInit(): void {
  }
  trackByFn(index, item) {
    return item.id;
  }
}
