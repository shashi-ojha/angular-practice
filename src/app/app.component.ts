import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { TopheaderComponent } from "./components/topheader/topheader.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, TopheaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecom-application';
}
