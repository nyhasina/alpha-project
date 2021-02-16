import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from '@nicecactus-platform/pipes';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
    imports: [CommonModule, PipesModule, NgSelectModule],
    declarations: [PaginatorComponent, SearchBarComponent],
    exports: [PaginatorComponent, SearchBarComponent, PipesModule],
})
export class SharedModule {}
