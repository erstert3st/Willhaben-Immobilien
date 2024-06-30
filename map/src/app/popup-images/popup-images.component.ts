import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup-images',
  standalone: true,
  imports: [],
  templateUrl: './popup-images.component.html',
  styleUrl: './popup-images.component.css'
})

export class PopupImagesComponent{
  @Input() imageInput: string = "";
  images: string[] = [];
  currentImage: string = "";
  currentIndex: number = 0;

  ngOnInit() {
    this.images = this.imageInput.split(";").map(image => `https://cache.willhaben.at/mmo/${image}`);

    if (this.images.length > 0) {
      this.currentIndex = 0;
    }
  }

  // @HostListener('window:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (event.key === 'ArrowLeft') {
  //     this.prevImage();
  //   } else if (event.key === 'ArrowRight') {
  //     this.nextImage();
  //   }
  // }

  onImageClick(event: MouseEvent): void {
    var imageElement = event.target as HTMLElement;
    var clickX = event.clientX; // X Koordinate des Klicks
    var imageWidth = imageElement.offsetWidth; // Breite des Bildes
    var imageLeftEdge = imageElement.getBoundingClientRect().left; // Linke Kante des Bildes
  
    if (clickX - imageLeftEdge < imageWidth / 2) {
      // Klick auf der linken Seite
      this.prevImage();
    } else {
      // Klick auf der rechten Seite
      this.nextImage();
    }
  }

  nextImage() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Zurück zum ersten Bild
    }
    console.log(this.images[this.currentIndex]);
  }

  prevImage() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1; // Zum letzten Bild
    }
    console.log(this.images[this.currentIndex]);

  }

}