import { Component } from '@angular/core';

const PAGE_SIZES = [10, 25, 50, 100];

@Component({
    selector: 'nicecactus-platform-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
    pageSizes = PAGE_SIZES;
}
