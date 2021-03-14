import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    providers: [NgbModalConfig, NgbModal]
})
export class DashboardComponent implements OnInit {
    tabs = ['First', 'Second', 'Third'];
    selected = new FormControl(1);
    // eslint-disable-next-line max-len
    games: Array<string> = ['Apex Legends', 'Auto Chess', 'Brawl Stars', 'Brawlhalla', 'Call of Duty', 'Call of duty Mobile', 'Call of duty Modern of War', 'Clash Royal', 'Fifa 21', 'Fortnite'];

    constructor(config: NgbModalConfig, private modalService: NgbModal) {
      config.backdrop = 'static';
      config.keyboard = false;
    }
    open(content) {
      this.modalService.open(content);
    }
    addTab(selectAfterAdding: boolean) {
        this.tabs.push('New');
      console.log(this.selected.setValue)
        if (selectAfterAdding) {
          this.selected.setValue(this.tabs.length - 1);
        }
      }
    
      removeTab(index: number) {
        this.tabs.splice(index, 1);
      }
    ngOnInit(): void {}
}
