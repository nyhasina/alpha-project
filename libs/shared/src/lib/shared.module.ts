import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
    imports: [CommonModule],
    declarations: [PaginatorComponent, SearchBarComponent],
    exports: [PaginatorComponent, SearchBarComponent],
})
export class SharedModule {}
