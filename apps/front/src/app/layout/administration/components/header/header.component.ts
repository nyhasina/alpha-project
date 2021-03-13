import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'nicecactus-platform-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  selected: string;
  constructor(private route: Router) {
    this.route.events.pipe(
      filter(event => event instanceof NavigationEnd)  
    ).subscribe((event: NavigationEnd) => {
      console.log(event.url);
      this.selected = event.url.split('/').pop()
      if(this.selected === 'r%C3%A8gles'){
        this.selected = 'règles'
      }
    });
   }
  ngOnInit(): void {
   
  }

}
