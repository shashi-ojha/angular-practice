// slider.component.ts
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slider',
  standalone: true, // Mark as standalone component
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('slideAnimation', [
      state('next', style({ transform: 'translateX(-100%)' })),
      state('current', style({ transform: 'translateX(0)' })),
      state('previous', style({ transform: 'translateX(100%)' })),
      transition('previous => current', animate('500ms ease-in-out')),
      transition('current => next', animate('500ms ease-in-out')),
      transition('next => previous', animate('500ms ease-in-out'))
    ])
  ]
})
export class SliderComponent {
  currentIndex = 0;
  slides: any[] = [
    { imageUrl: 'assets/images/slide-3.jpg' },
    { imageUrl: 'assets/images/slide-2.jpg' },
    { imageUrl: 'assets/images/slide-1.jpg' }
  ];

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }

  getSlideState(index: number): string {
    if (index === this.currentIndex) {
      return 'current';
    } else if (index === (this.currentIndex - 1 + this.slides.length) % this.slides.length) {
      return 'previous';
    } else {
      return 'next';
    }
  }
}
