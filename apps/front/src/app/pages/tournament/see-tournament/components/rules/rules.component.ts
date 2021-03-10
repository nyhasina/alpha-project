import { Component, OnInit, ViewChild } from '@angular/core';

import {MatAccordion} from '@angular/material/expansion';
interface iRules {
  titre: string,
  content: string
}
@Component({
  selector: 'nicecactus-platform-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss']
})

export class RulesComponent implements OnInit {
  bench: boolean = false;
  rules: Array<iRules> = [

  ]
  constructor() { }

  ngOnInit(): void {
  }

}
