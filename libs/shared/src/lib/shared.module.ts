import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgSelectModule } from '@ng-select/ng-select';
import { PipesModule } from '@nicecactus-platform/pipes';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ConfirmationDialogComponent } from './components/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from './services/dialog.service';
import { SkeletonListComponent } from './skeleton-list/skeleton-list.component';

@NgModule({
    imports: [CommonModule, PipesModule, NgSelectModule, FormsModule, MatDialogModule, MatButtonModule, MatProgressSpinnerModule],
    exports: [
        PaginatorComponent,
        SearchBarComponent,
        PipesModule,
        FormsModule,
        MatDialogModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        SkeletonListComponent,
    ],
    declarations: [PaginatorComponent, SearchBarComponent, ConfirmationDialogComponent, SkeletonListComponent],
    providers: [DialogService],
})
export class SharedModule {}
