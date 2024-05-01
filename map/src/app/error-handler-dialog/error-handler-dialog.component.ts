import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'error-handler-dialog',
  standalone: true,
  imports: [],
  template: './error-handler-dialog.component.html',
  styleUrl: './error-handler-dialog.component.css'
})

export class ErrorHandlerDialogComponent {
  public title = "Network Error";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
