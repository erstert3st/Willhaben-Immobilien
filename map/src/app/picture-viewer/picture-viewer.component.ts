import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-picture-viewer',
  standalone: true,
  imports: [NgComponentOutlet, AsyncPipe],
  templateUrl: './picture-viewer.component.html',
  styleUrl: './picture-viewer.component.css',
  template: `
    <div>
    <div class="picture-viewer d-flex flex-column align-items-center" style="height: 600px;">
    <img [src]="images[currentImageIndex]" class="img-fluid mb-3" style="max-height: 500px;" alt="Image">
      <div class="d-flex justify-content-between w-100">
        <button (click)="previousImage()" class="btn btn-primary">Previous</button>
        <button (click)="nextImage()" class="btn btn-primary">Next</button>
      </div>
    </div>
      <b>{{data.summary}}</b><br>
      <!-- Add more bindings here -->
    </div>
  `
})


export class PictureViewerComponent {
  @Input() data: any;
  images = [
    'https://picsum.photos/200/300',
    'https://picsum.photos/200',
    // Add more image URLs here
  ];
  currentImageIndex = 0;

  nextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    }
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
  }
}