// slides.ts

export interface Slide {
  imageUrl: string;
  // Add any other properties you need (e.g., title, description)
}

export const slidesData: Slide[] = [
  { imageUrl: 'assets/images/slide-1.jpg' },
  { imageUrl: 'assets/images/slide-2.jpg' },
  { imageUrl: 'assets/images/slide-3.jpg' },
  // ... more slides
];
