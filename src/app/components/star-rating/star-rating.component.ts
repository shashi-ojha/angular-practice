import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  imports: [CommonModule],
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Input() rating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
}
