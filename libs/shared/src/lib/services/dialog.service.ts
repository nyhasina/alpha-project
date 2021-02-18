import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class DialogService {
  constructor(
    private dialog: MatDialog
  ) { }
}
