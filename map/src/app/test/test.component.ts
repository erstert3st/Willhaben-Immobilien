import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [MatSnackBarModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent {

  constructor(private snackbar: MatSnackBar,     private dialog: MatDialog,
    private zone: NgZone) { }
  hallo(){
    console.log('hallo');
    this.zone.run(() => {
      this.snackbar.open('Error: lololo', 'Okay', {
        panelClass: ['error-snack'], // add a class to snackbar to add custom styles
      });
    });

  //  throw new Error('hallo');
  }
}
