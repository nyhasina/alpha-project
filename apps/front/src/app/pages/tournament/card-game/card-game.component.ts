import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nicecactus-platform-card-game',
  templateUrl: './card-game.component.html',
  styleUrls: ['./card-game.component.scss','../tournament.component.scss']
})
export class CardGameComponent implements OnInit {
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
