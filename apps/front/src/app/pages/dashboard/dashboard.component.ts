import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    tabs = ['First', 'Second', 'Third'];
    selected = new FormControl(0);
    constructor() {}
    addTab(selectAfterAdding: boolean) {
        this.tabs.push('New');
    
        if (selectAfterAdding) {
          this.selected.setValue(this.tabs.length - 1);
        }
      }
    
      removeTab(index: number) {
        this.tabs.splice(index, 1);
      }
    ngOnInit(): void {}
}
