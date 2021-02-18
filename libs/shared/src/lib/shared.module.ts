import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from '@nicecactus-platform/pipes';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from './services/dialog.service';

@NgModule({
    imports: [CommonModule, PipesModule, NgSelectModule, FormsModule, MatDialogModule, MatButtonModule],
    declarations: [PaginatorComponent, SearchBarComponent, ConfirmationDialogComponent],
    exports: [PaginatorComponent, SearchBarComponent, PipesModule, FormsModule, MatDialogModule, MatButtonModule],
    providers: [DialogService],
})
export class SharedModule {}
