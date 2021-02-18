import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from '@nicecactus-platform/pipes';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@NgModule({
    imports: [CommonModule, PipesModule, NgSelectModule, FormsModule],
    declarations: [PaginatorComponent, SearchBarComponent],
    exports: [PaginatorComponent, SearchBarComponent, PipesModule, FormsModule],
})
export class SharedModule {}
