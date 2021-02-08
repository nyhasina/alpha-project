import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nicecactus-platform-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerListes:Array<string> =['Avis Juridique', 'Conditions d\'utilisation',  'Conditions de vente', 'Politique de confidentialité et de cookies']
  constructor() { }

  ngOnInit(): void {
  }

}
