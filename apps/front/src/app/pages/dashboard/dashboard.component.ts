import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
interface iGames {
  name: string;
  imageURL: string;
}
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class DashboardComponent implements OnInit {
    gameTabs: Array<iGames> = [{
      name: 'Rogue Company',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5fb4f10f3817ac75c9012e5c/medias/CarrouselImage'
    },
    {
      name: 'Valorant',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5ee2000cca2d921b383b5c94/medias/CarrouselImage'
    },
    {
      name: 'Super Smash Bros. Ultimate',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5cee8f0964b0737b6aa1e7ef/medias/CarrouselImage'
    }];
    selected = new FormControl(0);
    selectedGame: iGames;
    modalGames = null;
    games: Array<iGames> = [{
      name: 'Apex legends',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5ed66c5d747d4c4c6ec5b866/medias/CarrouselImage'
    },
    {
      name: 'Auto Chess',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5d81f5cf5a598347f45a2cd6/medias/CarrouselImage'
    },
    {
      name: 'Brawl Stars',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5ed66865d91454556ff4a279/medias/CarrouselImage'
    },
    {
      name: 'Brawlhalla',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5f7f1204481ed16e674e3418/medias/CarrouselImage'
    },
    {
      name: 'Call Of Duty Cold War',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5fc4b522d3e5b7716c685a4c/medias/CarrouselImage'
    },
    {
      name: 'Call Of Duty Mobile',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5ef0b6910dd9927946aeab4f/medias/CarrouselImage'
    },
    {
      name: 'Call of duty Modern warfare',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5ed66bf1eea98b71ab0091c6/medias/CarrouselImage'
    },
    {
      name: 'Clash royale',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5e8307c38642776c25db0aa0/medias/CarrouselImage'
    },
    {
      name: 'CSGO',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5c36302a0842120a74d1afdc/medias/CarrouselImage'
    },
    {
      name: 'FIFA 21',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5f7f0e4b481ed14c964e3417/medias/CarrouselImage'
    },
    {
      name: 'Fortnite',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5cdd0c7f92d8a4579bfb73d0/medias/CarrouselImage'
    },
    {
      name: 'Hearthstone',
      imageURL: 'https://esm-prod-public.s3.amazonaws.com/game/5d22ee8a601440c0de0a9e98/medias/CarrouselImage'
    }]
    constructor(config: NgbModalConfig, private modalService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
    }
    open(content) {
     this.modalGames = this.modalService.open(content, { size: 'lg' });
    }
      selectGame(game) {
        this.selectedGame = game;
      }
      removeTab(index: number) {
        this.gameTabs.splice(index, 1);
      }
      confirm() {
        this.gameTabs.push(this.selectedGame);
        this.selected.setValue(this.gameTabs.length - 1);
        this.modalGames.close();
        this.selectedGame = null
      }
    ngOnInit(): void {}
}
