import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupImagesComponent } from './popup-images.component';

describe('PopupImagesComponent', () => {
  let component: PopupImagesComponent;
  let fixture: ComponentFixture<PopupImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
