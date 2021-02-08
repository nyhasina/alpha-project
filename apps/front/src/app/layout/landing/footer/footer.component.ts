import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nicecactus-platform-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  aboutUsListes: Array<any> = [
    {
      fa:'fa-traffic-light',
      detail: '2000',
      name:'TOURNOIS PAR MOIS'
    },
    {
      fa:'fa-award',
      detail: 'de l\'Europe',
      name:'LA PLATEFORME "TOUT EN UN" QUI SE DÉVELOPPE LE PLUS RAPIDEMENT,'
    },
    {
      fa:'fa-users',
      detail: '1 364 254',
      name:'COMMUNAUTÉ ET CROISSANCE'
    },
    {
      fa:'fa-road',
      detail: 'Road to sponsorship',
      name:''
    },
    {
      fa:'fa-award',
      detail: '1 million',
      name:'en cash prize'
    }
  ]
  footerListes: Array<string> = ['Avis Juridique', 'Conditions d\'utilisation',  'Conditions de vente', 'Politique de confidentialité et de cookies'];

  constructor() { }

  ngOnInit(): void {
  }

}
