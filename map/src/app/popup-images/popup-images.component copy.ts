import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import * as Lazy from 'vanilla-lazyload';


@Component({
  selector: 'app-popup-images',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-images.component.html',
  styleUrl: './popup-images.component.css'
})
export class PopupImagesComponent {
  @Input() imageUrlsString: string = "no Input";
  imageUrlList: string[] = [];
  modalImageSrc: string = "";
  galleryImagesSlider:any  = [];
  data: any[]  = [];


   constructor() {
    this.imageUrlList = this.imageUrlsString.split(",");
   }
    
      currentIndex: number = 0;
    
    
      ngOnInit(): void {
      }
    
    
      next() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }
    
      prev() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      }
    }