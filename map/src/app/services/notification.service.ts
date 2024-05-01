import { Injectable, NgZone } from '@angular/core';
//notification dialog
import { MatDialog } from '@angular/material/dialog';
//notification on the bottom of the screen
import { MatSnackBar } from '@angular/material/snack-bar';

import { ErrorHandlerDialogComponent } from '../error-handler-dialog/error-handler-dialog.component';
//https://meganrook.medium.com/angular-error-handling-made-easy-9bca1b4c52b0#:~:text=Angular%20provides%20a%20hook%20for,that%20replaces%20this%20default%20behaviour.
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    private zone: NgZone
  ) {}
//warning
  showClientError(message: string): void {
    // The snackbar or dialog won't run outside the Angular's zone. 
    // Wrapping it in the run method fixes this issue.
    this.zone.run(() => {
      this.snackbar.open(`Error: ${message}`, 'Okay', {
        panelClass: ['error-snack'], // add a class to snackbar to add custom styles
      });
    });
  }
//error
  openServerErrorDialog(message: string) {
    this.zone.run(() => {
      this.dialog.open(ErrorHandlerDialogComponent, {
        data: { message },
      });
    });
  }
//info
  showNonErrorSnackBar(message: string, duration = 6000) {
    this.snackbar.open(message, 'Okay', {
      panelClass: ['non-error-snack'],
      duration,
    });
  }
}