import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
    ConfirmationPayload,
    ConfirmationDialogComponent,
} from '../components/dialogs/confirmation-dialog/confirmation-dialog.component';

@Injectable()
export class DialogService {
    private dialogRef: MatDialogRef<any>;
    constructor(private dialog: MatDialog) {}

    openConfirmationModal(data: ConfirmationPayload) {
        this.dialogRef = this.dialog.open(ConfirmationDialogComponent, { data });
        return this.dialogRef.afterClosed();
    }
}
