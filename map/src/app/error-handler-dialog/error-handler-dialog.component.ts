import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";


@Component({
  selector: 'error-handler-dialog',
  standalone: true,
  imports: [],
  template: `<div class="modal-dialog modal-dialog-centered onTop">
  <div class="modal-content bg-dark text-white">
    <div class="modal-header p-3">
      <h5 class="modal-title">{{ title }}</h5> <!-- Verwenden Sie h5 anstelle von h1, um den Titel kleiner zu machen -->
    </div>
    <div class="modal-body text-center p-3"> 
      <p class="small">{{ data.message }}</p> <!-- Verwenden Sie die small Klasse, um den Text kleiner zu machen -->
    </div>
    <div class="modal-footer justify-content-end p-2">
      <button id="error-btn" class="btn btn-light" data-dismiss="modal">Okay</button>
    </div>
  </div>
</div>`,
  styleUrl: './error-handler-dialog.component.css'
})

export class ErrorHandlerDialogComponent {
  public title = "Network Error";
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
