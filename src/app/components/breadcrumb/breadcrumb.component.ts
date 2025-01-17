import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breadcrumb',
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
  constructor(
      private readonly route: ActivatedRoute,
    ) {}
}
